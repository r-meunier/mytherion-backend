# Email Service Provider Guide

This document provides guidance on email service providers for Mytherion, including setup instructions and recommendations for different environments.

---

## Current Setup

**Development:** MailHog (local SMTP server)  
**Production:** To be determined

---

## Email Service Provider Options

### Development/Testing

#### MailHog (Current)

**Status:** ✅ Implemented  
**Cost:** Free  
**Best For:** Local development and testing

**Pros:**

- No signup required
- Runs locally in Docker
- Web UI to view sent emails
- No rate limits
- Perfect for testing email flows

**Cons:**

- Development only (not for production)
- Emails don't actually send

**Setup:**

```yaml
# docker-compose.yml
mailhog:
  image: mailhog/mailhog:latest
  ports:
    - "1025:1025" # SMTP
    - "8025:8025" # Web UI
```

**Configuration:**

```yaml
# application.yml
spring:
  mail:
    host: localhost
    port: 1025
    username: ""
    password: ""
```

**Access Web UI:** `http://localhost:8025`

---

### Production Options

#### 1. SendGrid (Recommended for Small-Medium Scale)

**Cost:**

- Free tier: 100 emails/day
- Essentials: $19.95/month (50,000 emails/month)
- Pro: $89.95/month (100,000 emails/month)

**Pros:**

- Easy to set up
- Good documentation
- Reliable delivery
- Email analytics
- Template management
- Free tier for testing

**Cons:**

- Can be expensive at scale
- Requires account verification

**Setup:**

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Verify sender identity

**Configuration:**

```yaml
spring:
  mail:
    host: smtp.sendgrid.net
    port: 587
    username: apikey
    password: ${SENDGRID_API_KEY}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

**Code Changes:** None required (uses standard SMTP)

---

#### 2. AWS SES (Recommended for Large Scale)

**Cost:**

- $0.10 per 1,000 emails
- Free tier: 62,000 emails/month (if sent from EC2)

**Pros:**

- Very cost-effective at scale
- High deliverability
- Integrates with AWS ecosystem
- No monthly fees

**Cons:**

- Requires AWS account
- Initial sandbox mode (requires verification)
- More complex setup

**Setup:**

1. Create AWS account
2. Set up SES in AWS Console
3. Verify domain or email
4. Request production access (if needed)
5. Create SMTP credentials

**Configuration:**

```yaml
spring:
  mail:
    host: email-smtp.us-east-1.amazonaws.com
    port: 587
    username: ${AWS_SES_USERNAME}
    password: ${AWS_SES_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

**Code Changes:** None required (uses standard SMTP)

---

#### 3. Mailgun

**Cost:**

- Free tier: 5,000 emails/month (first 3 months)
- Foundation: $35/month (50,000 emails/month)
- Growth: $80/month (100,000 emails/month)

**Pros:**

- Good free tier
- Easy API
- Email validation
- Good analytics

**Cons:**

- Free tier limited to 3 months
- Requires domain verification

**Setup:**

1. Sign up at [mailgun.com](https://mailgun.com)
2. Verify domain
3. Get SMTP credentials

**Configuration:**

```yaml
spring:
  mail:
    host: smtp.mailgun.org
    port: 587
    username: ${MAILGUN_USERNAME}
    password: ${MAILGUN_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

**Code Changes:** None required (uses standard SMTP)

---

#### 4. Postmark

**Cost:**

- Free tier: 100 emails/month
- $15/month: 10,000 emails
- $50/month: 50,000 emails

**Pros:**

- Excellent deliverability
- Fast delivery
- Great support
- Focus on transactional emails

**Cons:**

- More expensive than alternatives
- Smaller free tier

**Setup:**

1. Sign up at [postmarkapp.com](https://postmarkapp.com)
2. Create server
3. Get SMTP credentials

**Configuration:**

```yaml
spring:
  mail:
    host: smtp.postmarkapp.com
    port: 587
    username: ${POSTMARK_TOKEN}
    password: ${POSTMARK_TOKEN}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

**Code Changes:** None required (uses standard SMTP)

---

## Comparison Table

| Provider     | Free Tier      | Cost at 10K/month | Cost at 100K/month | Best For        |
| ------------ | -------------- | ----------------- | ------------------ | --------------- |
| **MailHog**  | ∞ (dev only)   | N/A               | N/A                | Development     |
| **SendGrid** | 100/day        | $19.95            | $89.95             | Small-Medium    |
| **AWS SES**  | 62K (from EC2) | $1                | $10                | Large Scale     |
| **Mailgun**  | 5K (3 months)  | $35               | $80                | Medium          |
| **Postmark** | 100/month      | $15               | $50                | Premium Quality |

---

## Recommendation

### For Mytherion

**Current Stage (MVP):**

- **Development:** MailHog ✅
- **Production:** AWS SES or SendGrid

**Reasoning:**

1. **Start with SendGrid** if:
   - You want quick setup
   - Email volume < 50K/month
   - You prefer simplicity

2. **Start with AWS SES** if:
   - You're already using AWS
   - You expect high volume
   - You want lowest cost

**Migration Path:**

1. Develop with MailHog
2. Test with SendGrid free tier
3. Move to AWS SES when volume increases

---

## Implementation Architecture

### Email Service Abstraction

The current implementation uses Spring's `JavaMailSender` interface, which provides **provider independence**. This means:

✅ **No code changes needed** when switching providers  
✅ **Only configuration changes** required  
✅ **Easy to test** with different providers

**Current Implementation:**

```kotlin
@Service
class EmailService(
    private val mailSender: JavaMailSender,  // Provider-agnostic
    @Value("\${app.frontend.url}") private val frontendUrl: String,
    @Value("\${app.email.from}") private val fromEmail: String
) {
    fun sendVerificationEmail(email: String, token: String) {
        // Works with ANY SMTP provider
        val message = mailSender.createMimeMessage()
        // ... send email
    }
}
```

**To Switch Providers:**

1. Update `application.yml` with new SMTP settings
2. Update environment variables
3. Restart application
4. **No code changes required!**

---

## Environment Variables

### Development (.env)

```env
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM=noreply@mytherion.local
```

### Production (.env.production)

```env
MAIL_HOST=smtp.sendgrid.net  # or other provider
MAIL_PORT=587
MAIL_USERNAME=${SENDGRID_USERNAME}
MAIL_PASSWORD=${SENDGRID_API_KEY}
MAIL_FROM=noreply@mytherion.io
```

---

## Testing Email Delivery

### MailHog (Development)

1. Start MailHog: `docker-compose up mailhog`
2. Send test email
3. View at `http://localhost:8025`

### Production Providers

1. Use provider's test mode/sandbox
2. Send to verified email addresses
3. Check provider dashboard for delivery status
4. Monitor bounce rates and spam complaints

---

## Best Practices

### Email Deliverability

1. **Verify Domain**
   - Set up SPF, DKIM, DMARC records
   - Use custom domain (not Gmail/Yahoo)

2. **Sender Reputation**
   - Start with low volume
   - Gradually increase sending
   - Monitor bounce rates

3. **Email Content**
   - Avoid spam trigger words
   - Include unsubscribe link (for marketing emails)
   - Use plain text alternative

4. **Monitoring**
   - Track delivery rates
   - Monitor bounce rates
   - Watch for spam complaints

### Security

1. **Credentials**
   - Store in environment variables
   - Never commit to git
   - Rotate regularly

2. **Rate Limiting**
   - Implement sending limits
   - Prevent abuse
   - Monitor unusual activity

3. **Email Validation**
   - Validate email format
   - Check for disposable emails (optional)
   - Verify domain exists

---

## Migration Checklist

When switching email providers:

- [ ] Create account with new provider
- [ ] Verify domain/sender
- [ ] Get SMTP credentials
- [ ] Update `application.yml`
- [ ] Update environment variables
- [ ] Test in staging environment
- [ ] Monitor delivery rates
- [ ] Update documentation

---

## Troubleshooting

### Common Issues

**Emails not sending:**

- Check SMTP credentials
- Verify port is correct (587 for TLS, 465 for SSL)
- Check firewall settings
- Verify provider account is active

**Emails going to spam:**

- Set up SPF/DKIM/DMARC
- Verify sender domain
- Check email content for spam triggers
- Warm up sender reputation

**Rate limit errors:**

- Check provider limits
- Implement retry logic
- Upgrade plan if needed

---

## Future Enhancements

1. **Email Templates**
   - Use template engine (Thymeleaf)
   - Store templates in database
   - Support multiple languages

2. **Email Queue**
   - Implement async sending
   - Use message queue (RabbitMQ, Kafka)
   - Retry failed sends

3. **Analytics**
   - Track open rates
   - Track click rates
   - Monitor delivery rates

4. **Advanced Features**
   - Email scheduling
   - Batch sending
   - Personalization
   - A/B testing

---

## Related Documentation

- [Email Verification Implementation](../auth-future-features.md#2-email-verification)
- [Spring Mail Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#mail)

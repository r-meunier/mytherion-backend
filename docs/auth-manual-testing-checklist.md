# Authentication Manual Testing Checklist

This checklist guides you through manually testing all authentication features. Check off each item as you complete it.

---

## Pre-Testing Setup

### Environment Check

- [ ] Backend is running on `http://localhost:8080`
- [ ] Frontend is running on `http://localhost:3001`
- [ ] Database is accessible
- [ ] Browser DevTools is open (F12)
- [ ] Cookies are cleared for localhost

### Test Data

- [ ] Prepare test email: `test@example.com`
- [ ] Prepare test username: `testuser`
- [ ] Prepare test password: `password123`

---

## 1. User Registration Flow

### Test 1.1: Successful Registration ✅

**Steps:**

1. [ ] Navigate to `http://localhost:3001/register`
2. [ ] Fill in the form:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
   - Confirm Password: `password123`
3. [ ] Click "Register" button

**Expected Results:**

- [ ] Form submits without errors
- [ ] Redirected to home page (`/`)
- [ ] Navbar shows authenticated state:
  - [ ] Username displayed: "testuser"
  - [ ] "Profile", "Settings", and "Logout" buttons visible
  - [ ] "Login" button NOT visible
- [ ] Cookie `mytherion_token` is set
  - [ ] Open DevTools → Application → Cookies → `http://localhost:3001`
  - [ ] Cookie has `HttpOnly` flag ✓
  - [ ] Cookie has `SameSite=Strict` ✓

**Notes:**

```
Date/Time: _______________
Result: PASS / FAIL
Issues: _______________________________________________
```

---

### Test 1.2: Registration Validation - Invalid Email ❌

**Steps:**

1. [ ] Navigate to `/register`
2. [ ] Enter invalid email: `notanemail`
3. [ ] Fill other fields correctly
4. [ ] Click "Register"

**Expected Results:**

- [ ] Form does NOT submit
- [ ] Error message displayed: "Invalid email format"
- [ ] No API request made (check Network tab)

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 1.3: Registration Validation - Username Too Short ❌

**Steps:**

1. [ ] Navigate to `/register`
2. [ ] Enter username: `ab` (2 characters)
3. [ ] Fill other fields correctly
4. [ ] Click "Register"

**Expected Results:**

- [ ] Form does NOT submit
- [ ] Error message: "Username must be at least 3 characters"

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 1.4: Registration Validation - Password Too Short ❌

**Steps:**

1. [ ] Navigate to `/register`
2. [ ] Enter password: `pass123` (7 characters)
3. [ ] Fill other fields correctly
4. [ ] Click "Register"

**Expected Results:**

- [ ] Form does NOT submit
- [ ] Error message: "Password must be at least 8 characters"

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 1.5: Registration Validation - Password Mismatch ❌

**Steps:**

1. [ ] Navigate to `/register`
2. [ ] Enter password: `password123`
3. [ ] Enter confirm password: `password456`
4. [ ] Fill other fields correctly
5. [ ] Click "Register"

**Expected Results:**

- [ ] Form does NOT submit
- [ ] Error message: "Passwords do not match"

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 1.6: Registration - Duplicate Email ❌

**Steps:**

1. [ ] Register a user with email `test@example.com` (if not already done)
2. [ ] Logout
3. [ ] Try to register again with same email `test@example.com`

**Expected Results:**

- [ ] API returns error
- [ ] Error message displayed in form
- [ ] User remains on registration page
- [ ] No redirect occurs

**Notes:**

```
Result: PASS / FAIL
Error Message: _______________________________________________
```

---

## 2. User Login Flow

### Test 2.1: Successful Login ✅

**Prerequisites:** User account exists (email: `test@example.com`, password: `password123`)

**Steps:**

1. [ ] Navigate to `http://localhost:3001/login`
2. [ ] Enter email: `test@example.com`
3. [ ] Enter password: `password123`
4. [ ] Click "Login"

**Expected Results:**

- [ ] Form submits successfully
- [ ] Redirected to home page (`/`)
- [ ] Navbar shows authenticated state with username
- [ ] Cookie `mytherion_token` is set
- [ ] Cookie has security flags (HttpOnly, SameSite=Strict)

**Notes:**

```
Date/Time: _______________
Result: PASS / FAIL
```

---

### Test 2.2: Login - Invalid Credentials ❌

**Steps:**

1. [ ] Navigate to `/login`
2. [ ] Enter email: `test@example.com`
3. [ ] Enter password: `wrongpassword`
4. [ ] Click "Login"

**Expected Results:**

- [ ] API returns error
- [ ] Error message displayed: "Invalid credentials"
- [ ] User remains on login page
- [ ] No cookie is set

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 2.3: Login - Non-existent User ❌

**Steps:**

1. [ ] Navigate to `/login`
2. [ ] Enter email: `nonexistent@example.com`
3. [ ] Enter password: `password123`
4. [ ] Click "Login"

**Expected Results:**

- [ ] API returns error
- [ ] Error message: "Invalid credentials" (generic for security)
- [ ] No cookie is set

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 2.4: Login Validation - Empty Fields ❌

**Steps:**

1. [ ] Navigate to `/login`
2. [ ] Leave email and password empty
3. [ ] Click "Login"

**Expected Results:**

- [ ] Form does NOT submit
- [ ] Validation errors shown for both fields
- [ ] No API request made

**Notes:**

```
Result: PASS / FAIL
```

---

## 3. Session Persistence & Authentication State

### Test 3.1: Session Persistence on Page Refresh ✅

**Prerequisites:** User is logged in

**Steps:**

1. [ ] Login successfully
2. [ ] Verify navbar shows authenticated state
3. [ ] Refresh the page (F5 or Ctrl+R)

**Expected Results:**

- [ ] User remains authenticated after refresh
- [ ] Navbar still shows username and authenticated buttons
- [ ] Redux state is rehydrated via `/api/auth/me` call
- [ ] Cookie persists across refresh

**Technical Verification:**

- [ ] Check Network tab: `/api/auth/me` request is made on page load
- [ ] Request includes cookie automatically
- [ ] Response returns user info

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 3.2: Session Persistence Across Browser Tabs ✅

**Prerequisites:** User is logged in

**Steps:**

1. [ ] Login in Tab 1
2. [ ] Open new tab (Tab 2)
3. [ ] Navigate to `http://localhost:3001` in Tab 2

**Expected Results:**

- [ ] User is authenticated in Tab 2
- [ ] Navbar shows authenticated state
- [ ] Cookie is shared across tabs

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 3.3: Unauthenticated State on Fresh Visit ✅

**Prerequisites:** No cookies set (clear browser data)

**Steps:**

1. [ ] Clear all cookies for localhost
2. [ ] Navigate to `http://localhost:3001`

**Expected Results:**

- [ ] Navbar shows "Login" button
- [ ] No username displayed
- [ ] "Profile", "Settings", "Logout" buttons NOT visible
- [ ] Redux state: `isAuthenticated = false`, `user = null`

**Notes:**

```
Result: PASS / FAIL
```

---

## 4. Logout Flow

### Test 4.1: Successful Logout ✅

**Prerequisites:** User is logged in

**Steps:**

1. [ ] Click "Logout" button in navbar

**Expected Results:**

- [ ] User is redirected to `/login` page
- [ ] Cookie `mytherion_token` is cleared
  - [ ] Check DevTools: Cookie should be deleted or have Max-Age=0
- [ ] Redux state updated: `isAuthenticated = false`, `user = null`

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 4.2: Logout Clears Session Completely ✅

**Prerequisites:** User is logged in

**Steps:**

1. [ ] Logout
2. [ ] Navigate to home page (`/`)

**Expected Results:**

- [ ] User is NOT authenticated
- [ ] Navbar shows unauthenticated state
- [ ] No cookie present

**Notes:**

```
Result: PASS / FAIL
```

---

## 5. Navigation & Routing

### Test 5.1: Login to Register Navigation ✅

**Steps:**

1. [ ] Navigate to `/login`
2. [ ] Click "Register here" link

**Expected Results:**

- [ ] Redirected to `/register` page
- [ ] Registration form is displayed

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 5.2: Register to Login Navigation ✅

**Steps:**

1. [ ] Navigate to `/register`
2. [ ] Click "Login here" link

**Expected Results:**

- [ ] Redirected to `/login` page
- [ ] Login form is displayed

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 5.3: Unauthenticated User Clicks Login Button ✅

**Steps:**

1. [ ] Ensure logged out
2. [ ] Navigate to home page
3. [ ] Click "Login" button in navbar

**Expected Results:**

- [ ] Redirected to `/login` page

**Notes:**

```
Result: PASS / FAIL
```

---

## 6. Security Features

### Test 6.1: Cookie Security Flags ✅

**Prerequisites:** User is logged in

**Steps:**

1. [ ] Open DevTools → Application → Cookies
2. [ ] Inspect `mytherion_token` cookie

**Expected Results:**

- [ ] `HttpOnly` flag is set (prevents JavaScript access)
- [ ] `SameSite` is set to `Strict` (CSRF protection)
- [ ] `Secure` flag is `false` (development) - should be `true` in production
- [ ] `Path` is `/`
- [ ] `Max-Age` matches JWT expiration

**Notes:**

```
Result: PASS / FAIL
Cookie Details: _______________________________________________
```

---

### Test 6.2: Cookie Inaccessible to JavaScript ✅

**Prerequisites:** User is logged in

**Steps:**

1. [ ] Open browser console
2. [ ] Try to access cookie: `document.cookie`

**Expected Results:**

- [ ] `mytherion_token` is NOT visible in `document.cookie` output
- [ ] HttpOnly flag prevents JavaScript access

**Notes:**

```
Result: PASS / FAIL
Console Output: _______________________________________________
```

---

### Test 6.3: Password Not Exposed in Response ✅

**Steps:**

1. [ ] Register or login
2. [ ] Check Network tab → Response body

**Expected Results:**

- [ ] Response contains: `id`, `email`, `username`, `role`
- [ ] Response does NOT contain: `password`, `passwordHash`, or JWT token
- [ ] JWT is only in `Set-Cookie` header

**Notes:**

```
Result: PASS / FAIL
```

---

## 7. UI/UX Testing

### Test 7.1: Loading States ✅

**Steps:**

1. [ ] Submit login or register form
2. [ ] Observe button during API request

**Expected Results:**

- [ ] Button text changes to "Logging in..." or "Creating account..."
- [ ] Button is disabled during request
- [ ] Form fields are disabled during request
- [ ] Loading state ends after response

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 7.2: Form Field Clearing on Error ✅

**Steps:**

1. [ ] Enter invalid credentials
2. [ ] Submit form
3. [ ] Correct the error
4. [ ] Type in the field

**Expected Results:**

- [ ] Validation error clears when user starts typing
- [ ] API error remains until form is resubmitted

**Notes:**

```
Result: PASS / FAIL
```

---

### Test 7.3: Responsive Design ✅

**Steps:**

1. [ ] Test on different screen sizes (mobile, tablet, desktop)
2. [ ] Use DevTools responsive mode

**Expected Results:**

- [ ] Forms are centered and readable on all sizes
- [ ] Navbar adapts to screen size
- [ ] No horizontal scrolling
- [ ] Touch-friendly on mobile

**Notes:**

```
Result: PASS / FAIL
Screen Sizes Tested: _______________________________________________
```

---

## Test Summary

### Results Overview

| Category            | Tests  | Passed     | Failed     | Notes |
| ------------------- | ------ | ---------- | ---------- | ----- |
| Registration        | 6      | \_\_\_     | \_\_\_     |       |
| Login               | 4      | \_\_\_     | \_\_\_     |       |
| Session Persistence | 3      | \_\_\_     | \_\_\_     |       |
| Logout              | 2      | \_\_\_     | \_\_\_     |       |
| Navigation          | 3      | \_\_\_     | \_\_\_     |       |
| Security            | 3      | \_\_\_     | \_\_\_     |       |
| UI/UX               | 3      | \_\_\_     | \_\_\_     |       |
| **TOTAL**           | **24** | **\_\_\_** | **\_\_\_** |       |

### Issues Found

```
1. _______________________________________________
   Severity: Critical / High / Medium / Low
   Steps to Reproduce: _______________________________________________

2. _______________________________________________
   Severity: Critical / High / Medium / Low
   Steps to Reproduce: _______________________________________________

3. _______________________________________________
   Severity: Critical / High / Medium / Low
   Steps to Reproduce: _______________________________________________
```

### Overall Assessment

- [ ] All critical tests passed
- [ ] No blocking issues found
- [ ] Ready for production (with noted limitations)
- [ ] Requires fixes before deployment

**Tester:** ******\_\_\_******  
**Date:** ******\_\_\_******  
**Environment:** Development / Staging / Production  
**Browser:** ******\_\_\_******  
**OS:** ******\_\_\_******

---

## Notes

- Mark tests as PASS/FAIL in the checkboxes
- Document any issues immediately
- Take screenshots of failures
- Test in multiple browsers if possible
- Clear cookies between test runs for accurate results

---

## Related Documents

- [Test Plan](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/test_plan.md)
- [Future Features](file:///d:/Documents/Web%20Dev/mytherion/docs/auth-future-features.md)

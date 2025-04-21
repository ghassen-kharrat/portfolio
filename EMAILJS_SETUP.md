# Setting Up EmailJS for Your Contact Form

Follow these steps to configure EmailJS so your contact form actually sends messages to your inbox:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. The free plan allows 200 emails per month (enough for most portfolios)

## Step 2: Connect an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select your preferred email provider (Gmail, Outlook, Custom SMTP, etc.)
4. Follow the authentication steps
5. Name your service "service_portfolio" or update the code with your chosen service ID

## Step 3: Create an Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your template with the following variables:
   - `{{from_name}}`: The name of the person contacting you
   - `{{from_email}}`: Their email address
   - `{{subject}}`: The subject of the message
   - `{{message}}`: The message content
   - `{{to_name}}`: Your name (already set in the code)
4. Set the name of the template to "template_contact" or update the code with your chosen template ID

## Step 4: Get Your User ID

1. Go to "Account" → "API Keys"
2. Copy your Public Key

## Step 5: Update Your Code

1. In `src/components/EmailJSConfig.tsx`, replace `YOUR_USER_ID` with your actual EmailJS public key
2. In `src/components/sections/Contact.tsx`, update the following constants if you used different names:
   - `EMAILJS_SERVICE_ID`: Your email service ID
   - `EMAILJS_TEMPLATE_ID`: Your email template ID
   - `EMAILJS_USER_ID`: Your public key (same as in EmailJSConfig.tsx)

After completing these steps, your contact form will send real emails to your inbox when users submit the form.

## Debugging

If you encounter issues:
1. Check the browser console for error messages
2. Verify your EmailJS credentials are correct
3. Make sure your email service connection is active
4. Test the template directly in the EmailJS dashboard

For more help, visit the [EmailJS documentation](https://www.emailjs.com/docs/). 
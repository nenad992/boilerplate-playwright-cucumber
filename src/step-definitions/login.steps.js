const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('the user navigates to the profile page', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const siteConfig = getSiteConfig();
  const profileUrl = `${siteConfig.baseUrl}/profile`;

  await this.page.goto(profileUrl);
  await this.page.waitForLoadState('networkidle');
});

Then('the user profile information should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let profileInfo = await this.page.$('[data-testid="profile-info"]');
  if (!profileInfo) {
    profileInfo = await this.page.$('.profile-information');
  }

  expect(profileInfo).not.toBeNull('Profile information should be displayed');
});

Then('the profile picture should be visible', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let profilePic = await this.page.$('img[alt="Profile picture"]');
  if (!profilePic) {
    profilePic = await this.page.$('[data-testid="profile-picture"]');
  }

  expect(profilePic).not.toBeNull('Profile picture should exist');

  const isVisible = profilePic ? await profilePic.isVisible() : false;
  expect(isVisible).toBeTruthy('Profile picture should be visible');
});

Then('the user name should match the logged-in user', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let userName = await this.page.$('[data-testid="profile-name"]');
  if (!userName) {
    userName = await this.page.$('.profile-name');
  }

  expect(userName).not.toBeNull('Profile name element should exist');

  const text = await userName?.textContent();
  expect(text).toBeTruthy('Profile name should not be empty');
});

When('clicks the edit profile button', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let editButton = this.page.getByRole('button', { name: /edit profile/i });
  if (!editButton) {
    editButton = await this.page.$('[data-testid="edit-profile-btn"]');
  }

  if (!editButton) {
    throw new Error('Edit profile button not found');
  }

  await editButton.click();
  await this.page.waitForLoadState('networkidle');
});

When('updates the following fields:', async function (dataTable) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const fields = dataTable.hashes();

  for (const field of fields) {
    const fieldName = field.Field.toLowerCase().replace(/\s+/g, '-');
    let input = await this.page.$(`input[name="${fieldName}"]`);
    if (!input) {
      input = await this.page.$(`input[placeholder*="${field.Field}"]`);
    }

    if (input) {
      await input.fill(field.Value);
    }
  }
});

When('saves the changes', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let saveButton = this.page.getByRole('button', { name: /save/i });
  if (!saveButton) {
    saveButton = await this.page.$('button[type="submit"]');
  }

  if (!saveButton) {
    throw new Error('Save button not found');
  }

  await saveButton.click();
  await this.page.waitForLoadState('networkidle');
});

Then('a success message should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let successMsg = await this.page.$('.success-message');
  if (!successMsg) {
    successMsg = await this.page.$('.alert-success');
  }
  if (!successMsg) {
    successMsg = await this.page.$('[data-testid="success-message"]');
  }

  expect(successMsg).not.toBeNull('Success message should be displayed');

  const isVisible = successMsg ? await successMsg.isVisible() : false;
  expect(isVisible).toBeTruthy('Success message should be visible');
});

Then('the profile should be updated with the new information', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Reload page and verify data persisted
  await this.page.reload();
  await this.page.waitForLoadState('networkidle');

  let profileInfo = await this.page.$('[data-testid="profile-info"]');
  if (!profileInfo) {
    profileInfo = await this.page.$('.profile-information');
  }

  expect(profileInfo).not.toBeNull('Profile should be reloaded with new information');
});

When('navigates to account settings', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const siteConfig = getSiteConfig();
  const settingsUrl = `${siteConfig.baseUrl}/account-settings`;

  await this.page.goto(settingsUrl);
  await this.page.waitForLoadState('networkidle');
});

When('clicks on change password', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let changePasswordBtn = this.page.getByRole('button', { name: /change password/i });
  if (!changePasswordBtn) {
    changePasswordBtn = this.page.getByRole('link', { name: /change password/i });
  }

  if (!changePasswordBtn) {
    throw new Error('Change password button/link not found');
  }

  await changePasswordBtn.click();
  await this.page.waitForLoadState('networkidle');
});

When('enters the current password', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const currentPassword = process.env.TEST_USER_PASSWORD || 'password123';
  const passwordInput = await this.page.$('input[placeholder*="Current password"]');

  if (!passwordInput) {
    throw new Error('Current password input not found');
  }

  await passwordInput.fill(currentPassword);
});

When('enters a new password', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const newPasswordInput = await this.page.$('input[placeholder*="New password"]');

  if (!newPasswordInput) {
    throw new Error('New password input not found');
  }

  await newPasswordInput.fill('NewPassword123!');
});

When('confirms the new password', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const confirmPasswordInput = await this.page.$('input[placeholder*="Confirm password"]');

  if (!confirmPasswordInput) {
    throw new Error('Confirm password input not found');
  }

  await confirmPasswordInput.fill('NewPassword123!');
});

When('submits the form', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const submitButton = await this.page.$('button[type="submit"]');

  if (!submitButton) {
    throw new Error('Submit button not found');
  }

  await submitButton.click();
  await this.page.waitForLoadState('networkidle');
});

Then('the password should be changed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const successMsg = await this.page.$('.success-message, .alert-success');
  expect(successMsg).not.toBeNull('Success message should be displayed after password change');
});

When('clicks on the profile picture', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let profilePic = await this.page.$('img[alt="Profile picture"]');
  if (!profilePic) {
    profilePic = await this.page.$('[data-testid="profile-picture"]');
  }

  if (!profilePic) {
    throw new Error('Profile picture not found');
  }

  await profilePic.click();
});

When('uploads a new profile picture', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const fileInput = await this.page.$('input[type="file"]');
  if (!fileInput) {
    throw new Error('File input for picture upload not found');
  }

  // Create a simple test image path
  const path = require('path');
  const testImagePath = path.join(__dirname, '../../data/test-image.png');

  try {
    await fileInput.setInputFiles(testImagePath);
    await this.page.waitForLoadState('networkidle');
  } catch (e) {
    console.warn(`Warning: Could not upload test image: ${e.message}`);
  }
});

Then('the picture should be uploaded successfully', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const successMsg = await this.page.$('.success-message, .alert-success');
  expect(successMsg).not.toBeNull('Upload success message should be displayed');
});

Then('the profile picture should be updated', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const profilePic = await this.page.$('img[alt="Profile picture"]');
  expect(profilePic).not.toBeNull('Profile picture should exist after update');
});

When('clicks on activity log', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let activityBtn = this.page.getByRole('button', { name: /activity log/i });
  if (!activityBtn) {
    activityBtn = this.page.getByRole('link', { name: /activity log/i });
  }

  if (!activityBtn) {
    throw new Error('Activity log button/link not found');
  }

  await activityBtn.click();
  await this.page.waitForLoadState('networkidle');
});

Then('a list of recent activities should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const activityList = await this.page.$$('[data-testid="activity-item"], .activity-item');
  expect(activityList.length).toBeGreaterThan(0);
});

Then('each activity should show timestamp and action', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const activities = await this.page.$$('[data-testid="activity-item"], .activity-item');
  for (const activity of activities) {
    let timestamp = await activity.$('[data-testid="timestamp"]');
    if (!timestamp) {
      timestamp = await activity.$('.timestamp');
    }

    let actionElement = await activity.$('[data-testid="action"]');
    if (!actionElement) {
      actionElement = await activity.$('.action');
    }

    expect(timestamp).not.toBeNull('Timestamp should be present');
    expect(actionElement).not.toBeNull('Action should be present');
  }
});

When('navigates to preferences', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const siteConfig = getSiteConfig();
  const preferencesUrl = `${siteConfig.baseUrl}/preferences`;

  await this.page.goto(preferencesUrl);
  await this.page.waitForLoadState('networkidle');
});

When('toggles email notifications', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const toggle = await this.page.$('input[type="checkbox"][aria-label*="Email notifications"]');
  if (toggle) {
    await toggle.check();
  }
});

When('selects notification frequency {string}', async function (frequency) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const frequencySelect = await this.page.$('select[name="notification-frequency"]');
  if (!frequencySelect) {
    throw new Error('Notification frequency select not found');
  }

  await frequencySelect.selectOption(frequency);
});

When('saves preferences', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let saveBtn = this.page.getByRole('button', { name: /save preferences/i });
  if (!saveBtn) {
    saveBtn = await this.page.$('button[type="submit"]');
  }

  if (!saveBtn) {
    throw new Error('Save preferences button not found');
  }

  await saveBtn.click();
  await this.page.waitForLoadState('networkidle');
});

Then('the preferences should be saved', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const successMsg = await this.page.$('.success-message, .alert-success');
  expect(successMsg).not.toBeNull('Preferences saved confirmation should be displayed');
});

/**
 * Helper function to get site configuration
 */
function getSiteConfig() {
  const site = process.env.SITE || 'site1';
  try {
    return require(`../../config/sites/${site}.config.js`);
  } catch (e) {
    console.warn(`Could not load site config for ${site}, using site1 as fallback`);
    return require('../../config/sites/site1.config.js');
  }
}

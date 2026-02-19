const BasePage = require('./base.page');

class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.profileInfo = '[data-testid="profile-info"], .profile-information';
    this.profilePicture = 'img[alt="Profile picture"], [data-testid="profile-picture"]';
    this.profileName = '[data-testid="profile-name"], .profile-name';
    this.editProfileButton = 'button[data-testid="edit-profile-btn"], button[aria-label*="Edit"]';
    this.changePasswordButton =
      'button[aria-label*="Change"], button[data-testid="change-pwd-btn"]';
    this.activityLogButton = 'button[aria-label*="Activity"], a[data-testid="activity-log"]';
    this.successMessage = '.success-message, .alert-success, [data-testid="success-message"]';
    this.errorMessage = '.error-message, .alert-danger';
    this.saveButton = 'button[type="submit"], button[data-testid="save-btn"]';
  }

  /**
   * Navigate to profile page
   */
  async navigateToProfile() {
    const siteConfig = require('../config/sites/site1.config.js');
    const profileUrl = `${siteConfig.baseUrl}/profile`;
    await this.goto(profileUrl);
  }

  /**
   * Wait for profile page to load
   */
  async waitForProfileLoad() {
    await this.waitForElement(this.profileInfo);
  }

  /**
   * Check if profile info is visible
   */
  async isProfileInfoVisible() {
    return await this.isElementVisible(this.profileInfo);
  }

  /**
   * Check if profile picture is visible
   */
  async isProfilePictureVisible() {
    return await this.isElementVisible(this.profilePicture);
  }

  /**
   * Get profile name
   */
  async getProfileName() {
    return await this.getElementText(this.profileName);
  }

  /**
   * Click edit profile button
   */
  async clickEditProfile() {
    const editBtn = await this.page.$(this.editProfileButton);
    if (!editBtn) {
      throw new Error('Edit profile button not found');
    }
    await editBtn.click();
    await this.waitForPageLoad();
  }

  /**
   * Edit profile field
   */
  async editProfileField(fieldName, value) {
    const fieldSelector = `input[name="${fieldName.toLowerCase().replace(/\s+/g, '-')}"], input[placeholder*="${fieldName}"]`;
    const element = await this.page.$(fieldSelector);
    if (!element) {
      throw new Error(`Profile field "${fieldName}" not found`);
    }
    await this.fillInput(fieldSelector, value);
  }

  /**
   * Save profile changes
   */
  async saveChanges() {
    const saveBtn = await this.page.$(this.saveButton);
    if (!saveBtn) {
      throw new Error('Save button not found');
    }
    await saveBtn.click();
    await this.waitForPageLoad();
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible() {
    return await this.isElementVisible(this.successMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage() {
    const successMsg = await this.page.$(this.successMessage);
    if (!successMsg) {
      throw new Error('Success message not found');
    }
    return await this.getElementText(this.successMessage);
  }

  /**
   * Click change password
   */
  async clickChangePassword() {
    const pwdBtn = await this.page.$(this.changePasswordButton);
    if (!pwdBtn) {
      throw new Error('Change password button not found');
    }
    await pwdBtn.click();
    await this.waitForPageLoad();
  }

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword) {
    const currentPwdInput = await this.page.$('input[placeholder*="Current password"]');
    const newPwdInput = await this.page.$('input[placeholder*="New password"]');
    const confirmPwdInput = await this.page.$('input[placeholder*="Confirm password"]');

    if (!currentPwdInput || !newPwdInput || !confirmPwdInput) {
      throw new Error('Password input fields not found');
    }

    await this.fillInput('input[placeholder*="Current password"]', currentPassword);
    await this.fillInput('input[placeholder*="New password"]', newPassword);
    await this.fillInput('input[placeholder*="Confirm password"]', newPassword);
    await this.clickElement(this.saveButton);
    await this.waitForPageLoad();
  }

  /**
   * Click activity log
   */
  async clickActivityLog() {
    const actBtn = await this.page.$(this.activityLogButton);
    if (!actBtn) {
      throw new Error('Activity log button not found');
    }
    await actBtn.click();
    await this.waitForPageLoad();
  }

  /**
   * Get activity items count
   */
  async getActivityItemsCount() {
    return await this.getElementCount('[data-testid="activity-item"], .activity-item');
  }

  /**
   * Navigate to account settings
   */
  async navigateToAccountSettings() {
    const siteConfig = require('../config/sites/site1.config.js');
    const settingsUrl = `${siteConfig.baseUrl}/account-settings`;
    await this.goto(settingsUrl);
  }

  /**
   * Navigate to preferences
   */
  async navigateToPreferences() {
    await this.goto('/preferences');
  }

  /**
   * Toggle notification
   */
  async toggleNotification(notificationType) {
    const selector = `input[type="checkbox"][aria-label*="${notificationType}"]`;
    const checkbox = await this.page.$(selector);
    if (checkbox) {
      await checkbox.check();
    }
  }

  /**
   * Save preferences
   */
  async savePreferences() {
    await this.clickElement('button:has-text("Save Preferences"), button[type="submit"]');
    await this.waitForPageLoad();
  }
}

module.exports = ProfilePage;

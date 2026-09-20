const { test, expect } = require('@playwright/test');

test.describe('Insulfim Gregório Website Verification', () => {
  test('should have correct company name', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Insulfim Gregório - Serviço de aplicação de película automotiva/);

    // Check for company name in header
    await expect(page.locator('h1:has-text("Insulfim Gregório")')).toBeVisible();

    // Check for company name in hero section
    await expect(page.locator('.hero-content h1')).toHaveText('Insulfim Gregório');
  });

  test('should have correct address', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check address in contact section
    await expect(page.locator('text=Av. Dr. Alexandre Rasgulaeff, 1049 - Jardim Alvorada')).toBeVisible();
    await expect(page.locator('text=Maringá - PR, 87035-510')).toBeVisible();

    // Check address in footer
    await expect(page.locator('footer text=Av. Dr. Alexandre Rasgulaeff, 1049 - Jardim Alvorada')).toBeVisible();
  });

  test('should have correct phone number', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check phone in header
    await expect(page.locator('text=(44) 99981-9049')).toBeVisible();

    // Check phone in footer
    await expect(page.locator('footer text=(44) 99981-9049')).toBeVisible();
  });

  test('should have correct WhatsApp link', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check WhatsApp links
    const whatsappLinks = page.locator('a[href*="wa.me/5544999819049"]');
    await expect(whatsappLinks).toHaveCount(3); // Header, CTA, and floating button

    // Check that old Rota 44 WhatsApp link is gone
    const oldWhatsappLinks = page.locator('a[href*="wa.me/5544991585602"]');
    await expect(oldWhatsappLinks).toHaveCount(0);
  });

  test('should have correct rating information', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check rating value
    await expect(page.locator('.social-proof-rating .rating-value')).toHaveText('5,0');

    // Check review count
    await expect(page.locator('.social-proof-text')).toHaveText('2 avaliações no Google');
  });

  test('should not contain any Rota 44 references', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check for any remaining Rota 44 text
    const rota44Text = page.locator(':text-is("Rota 44")');
    await expect(rota44Text).toHaveCount(0);

    // Check for any remaining rota44 text (case insensitive)
    const rota44CaseInsensitive = page.locator(':text-contains("rota 44")');
    await expect(rota44CaseInsensitive).toHaveCount(0);
  });

  test('should have correct Google Maps link', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check Google Maps link in location section
    const mapsLink = page.locator('.localizacao a[href*="google.com/maps"]');
    await expect(mapsLink).toHaveAttribute('href', 'https://www.google.com/maps/search/?api=1&query=Av.%20Dr.%20Alexandre%20Rasgulaeff,%201049%20-%20Jardim%20Alvorada,%20Maring%C3%A1%20-%20PR,%2087035-510');

    // Check Google Maps link in footer
    const footerMapsLink = page.locator('footer a[href*="google.com/maps"]');
    await expect(footerMapsLink).toHaveAttribute('href', 'https://www.google.com/maps/search/?api=1&query=Av.%20Dr.%20Alexandre%20Rasgulaeff,%201049%20-%20Jardim%20Alvorada,%20Maring%C3%A1%20-%20PR,%2087035-510');
  });

  test('should verify WhatsApp floating button works', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check floating WhatsApp button exists
    const floatingButton = page.locator('.whatsapp-float');
    await expect(floatingButton).toBeVisible();

    // Check it has correct href
    await expect(floatingButton).toHaveAttribute('href', 'https://wa.me/5544999819049?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20os%20servi%C3%A7os%20da%20Insulfim%20Greg%C3%B3rio%20e%20solicitar%20um%20or%C3%A7amento.');

    // Check it has correct target
    await expect(floatingButton).toHaveAttribute('target', '_blank');

    // Check it has correct aria-label
    await expect(floatingButton).toHaveAttribute('aria-label', 'Contato via WhatsApp');
  });
});
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'desktop-1920', width: 1920, height: 1080 },
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'laptop-1280', width: 1280, height: 800 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'mobile-375', width: 375, height: 667 },
    { name: 'mobile-320', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Full page screenshot
    await page.screenshot({ path: `screenshots/${vp.name}-full.png`, fullPage: true });

    // Above the fold
    await page.screenshot({ path: `screenshots/${vp.name}-hero.png` });

    // Scroll to projects
    await page.evaluate(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `screenshots/${vp.name}-projects.png` });

    // Scroll to experience
    await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `screenshots/${vp.name}-experience.png` });

    // Scroll to contact
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `screenshots/${vp.name}-contact.png` });

    // Check for overflow issues
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // Check nav visibility
    const navVisible = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return false;
      const rect = nav.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    // Check for text truncation/overflow
    const hasTextOverflow = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, p, a, span');
      for (const el of elements) {
        if (el.scrollWidth > el.clientWidth + 5) return true;
      }
      return false;
    });

    console.log(`${vp.name}: overflow=${hasHorizontalScroll} nav=${navVisible} textOverflow=${hasTextOverflow}`);

    await page.close();
  }

  await browser.close();
  console.log('Screenshots saved to screenshots/');
})();

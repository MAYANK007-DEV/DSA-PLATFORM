import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanBrandName,
  extractBrandNameFromFileName,
  validateImageFile,
  DEFAULT_BRAND,
  DEFAULT_LOGO_SVG,
  PRESET_LOGOS,
} from './brandLogic.ts';

test('DEFAULT_BRAND has a valid default SVG logo', () => {
  assert.ok(DEFAULT_BRAND.logoUrl);
  assert.equal(DEFAULT_BRAND.websiteName, 'Practice Kit Coding');
  assert.ok(PRESET_LOGOS.length >= 4);
});

test('cleanBrandName defaults to Practice Kit Coding when empty or whitespace', () => {
  assert.equal(cleanBrandName(''), DEFAULT_BRAND.websiteName);
  assert.equal(cleanBrandName('   '), DEFAULT_BRAND.websiteName);
  assert.equal(cleanBrandName(null), DEFAULT_BRAND.websiteName);
  assert.equal(cleanBrandName(undefined), DEFAULT_BRAND.websiteName);
  assert.equal(cleanBrandName('Acme Dev'), 'Acme Dev');
});

test('extractBrandNameFromFileName formats filename without extension to capitalized title', () => {
  assert.equal(extractBrandNameFromFileName('my-cool-logo.png'), 'My Cool Logo');
  assert.equal(extractBrandNameFromFileName('super_brand.svg'), 'Super Brand');
  assert.equal(extractBrandNameFromFileName('company_logo_2026.webp'), 'Company Logo 2026');
  assert.equal(extractBrandNameFromFileName(''), DEFAULT_BRAND.websiteName);
});

test('validateImageFile accepts image by MIME type or file extension', () => {
  const validPng = { size: 1024 * 500, type: 'image/png' };
  assert.equal(validateImageFile(validPng).valid, true);

  // Even if MIME type is empty, valid extension passes
  const validByExt = { size: 1024 * 10, type: '', name: 'custom_logo.svg' };
  assert.equal(validateImageFile(validByExt).valid, true);

  const phonePhoto = { size: 5 * 1024 * 1024, type: 'image/jpeg', name: 'photo.jpg' };
  assert.equal(validateImageFile(phonePhoto).valid, true);
});

test('validateImageFile rejects non-image files or oversized files > 15MB', () => {
  const pdfFile = { size: 1024 * 100, type: 'application/pdf', name: 'document.pdf' };
  const resPdf = validateImageFile(pdfFile);
  assert.equal(resPdf.valid, false);
  assert.match(resPdf.error || '', /image file/i);

  const giantFile = { size: 20 * 1024 * 1024, type: 'image/png', name: 'huge.png' };
  const resGiant = validateImageFile(giantFile);
  assert.equal(resGiant.valid, false);
  assert.match(resGiant.error || '', /15MB/i);
});

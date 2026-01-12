import {describe, it, expect} from 'vitest';
import {QUESTIONS, RESULTS} from '../src/data';
import {Result} from '../src/types';

describe('Data', () => {
  describe('QUESTIONS', () => {
    it('has correct number of questions', () => {
      expect(QUESTIONS.length).toBe(4);
    });

    it('contains string identifiers', () => {
      QUESTIONS.forEach((q) => {
        expect(typeof q).toBe('string');
        expect(q.length).toBeGreaterThan(0);
      });
    });
  });

  describe('RESULTS', () => {
    it('has at least one result', () => {
      expect(RESULTS.length).toBeGreaterThan(0);
    });

    it('each result has required fields', () => {
      RESULTS.forEach((result) => {
        expect(result).toHaveProperty('slug');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('subtitle');
        expect(result).toHaveProperty('text');
        expect(result).toHaveProperty('theme');

        expect(typeof result.slug).toBe('string');
        expect(typeof result.title).toBe('string');
        expect(typeof result.subtitle).toBe('string');
        expect(typeof result.text).toBe('string');
        expect(typeof result.theme).toBe('string');
      });
    });

    it('each result has unique slug', () => {
      const slugs = RESULTS.map((r) => r.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('results match Result type', () => {
      RESULTS.forEach((result) => {
        const typedResult: Result = result;
        expect(typedResult).toBeDefined();
      });
    });
  });
});

import {useTranslation} from 'react-i18next';
import {Result} from '@/types';

export function useShareImage() {
  const {i18n} = useTranslation();

  const buildShareImage = async (result: Result): Promise<{dataUrl: string; blob: Blob | null}> => {
    const el = document.getElementById('share-card');
    if (!el) return {dataUrl: '', blob: null};

    const {default: html2canvas} = await import('html2canvas');
    const canvas = await html2canvas(el, {scale: 3});
    const dataUrl = canvas.toDataURL('image/png');
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/png'),
    );

    const url = new URL(window.location.href);
    url.pathname = `/r/${result.slug}`;
    url.searchParams.set('lng', i18n.language);
    window.history.replaceState({}, '', url.toString());

    try {
      await fetch(`/api/share?slug=${result.slug}&lng=${i18n.language}`);
    } catch (err) {
      console.error(err);
    }

    return {dataUrl, blob};
  };

  const downloadImage = async (result: Result): Promise<void> => {
    const {dataUrl} = await buildShareImage(result);
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'my-result.png';
    a.click();
  };

  const shareImage = async (result: Result): Promise<void> => {
    const {dataUrl, blob} = await buildShareImage(result);
    const file = blob ? new File([blob], 'my-result.png', {type: 'image/png'}) : null;
    const shareData: ShareData = {
      title: result.title,
      text: result.subtitle,
      url: window.location.href,
      files: file ? [file] : undefined,
    };

    if (file && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    // Fallback: open the image in a new tab so the user can post manually (e.g., IG/FB).
    const w = window.open();
    if (w && dataUrl) {
      w.document.write(`<img src="${dataUrl}" alt="result" />`);
    } else if (dataUrl) {
      window.location.href = dataUrl;
    }
  };

  return {
    shareImage,
    downloadImage,
  };
}

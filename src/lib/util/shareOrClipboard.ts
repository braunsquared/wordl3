const shareOrClipboard = async (content: string): Promise<boolean> => {
  if (navigator.share && navigator.canShare) {
    if (navigator.canShare({ text: content })) {
      await navigator.share({ text: content });
    }
    return true;
  } else {
    await navigator.clipboard.writeText(content);
    return false;
  }
};

export default shareOrClipboard;

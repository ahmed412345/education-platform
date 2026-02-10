function getPosition(targetEl: HTMLElement | null, containerEl: HTMLElement | null) {
    if (!targetEl || !containerEl) return;

    const tRect = targetEl.getBoundingClientRect();
    const cRect = containerEl.getBoundingClientRect();

    // مركز العنصر بالنسبة للحاوية
    const centerX = tRect.left - cRect.left + tRect.width / 2;
    const centerY = tRect.top - cRect.top + tRect.height / 2;

    const viewportCenterX = cRect.width / 2;
    const viewportCenterY = cRect.height / 2;

    // الإزاحة بالبكسل
    const moveXpx = viewportCenterX - centerX;
    const moveYpx = viewportCenterY - centerY;

    // تحويل لبنسبة مئوية من أبعاد الحاوية
    const moveXPercent = (moveXpx / cRect.width) * 100;
    const moveYPercent = (moveYpx / cRect.height) * 100;

    return {
        moveXPercent,
        moveYPercent,
    };
}

export { getPosition };

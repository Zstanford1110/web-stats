chrome.storage.local.get(['visitCounts'], (result) => {
  const visitCounts = result.visitCounts || {};
  const sortedCounts = Object.entries(visitCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const ol = document.getElementById('top-sites');
  sortedCounts.forEach(([site, count]) => {
    const li = document.createElement('li');
    li.textContent = `${site} (${count})`;
    ol.appendChild(li);
  });
});
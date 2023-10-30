const ARTICLE_CLASS = 'wLL07_0Xnd1QZpzpfR4W';
const LINK_CLASS = 'Rn_JXVtoPVAFyGkcaXyK';
const FIRST_RESULT = 'r1-0';
const searchResultList = document.getElementsByClassName('react-results--main')[0];

removeSpams(searchResultList.children);

const observer = new MutationObserver(records => {
  records.forEach(record => {
    removeSpams(record.addedNodes);
  });
});

function removeSpams(source) {
  Array.from(source)
    .filter(node => node.className == ARTICLE_CLASS)
    .filter(node => isSpamSite(node))
    .forEach(spam => spam.remove());
}

observer.observe(searchResultList, {
  childList: true
});

function isSpamSite(element) {
  const article = element.firstChild;
  var href = null;
  if (article.getAttribute('id') == FIRST_RESULT) {
    href = article.firstChild.firstChild.firstChild.lastChild.getAttribute('href');
  } else { 
    href = article.firstChild.getElementsByClassName(LINK_CLASS)[0].getAttribute('href');
  }
  return /sejuku/.test(href);
}

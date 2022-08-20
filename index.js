// const
// page elements
const [
  IMAGE,
  MAIN_TEXT,
  QUESTION,
  NAVIGATION,
  MESSAGE_BANNER
] = [
  'image', // address of an image
  'main_text', // main text
  'question', // test questions
  // nav, help, related topics
  'navigation', // list of navigation links,
  'message_banner'
].map(id => document.getElementById(id.toLocaleLowerCase()));

// content
const mockContent = {
  '': {
    image: 'this is a gif',
    main_text: 'this is the main text',
    question: 'this is a question',
    navigation: [
      { type: 'nav', label: 'BACK', disabled: true, link: '/courses' },
      { type: 'nav', label: 'NEXT', link: '/sdtr' },
    ],
  }
}

// helper functions
function log(message, info = '', level = 'log') {
  console.log(message, info, level);
  MESSAGE_BANNER.innerText = message;
}

function isDomElement(obj) {
  return obj instanceof Node || obj instanceof Element || obj instanceof HTMLElement;
}

// use classList for classes
function createElement(element = 'div', attributes = {}, children = []) {
  const el = element === 'textNode' ? document.createTextNode('') : document.createElement(element);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'onclick') {
      el.setAttribute(key, value);
    } else {
      el[key] = value
    }
  });
  children.forEach(v => el.append(isDomElement(v) ? v : createElement(v.element, v.attributes, v.children)));
  return el;
}


// page functions
function getContent(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockContent[url]) { resolve(mockContent[url]); }
      else { reject(new Error('no content found')); }
    }, 500);
  })
}

function displayContent(content) {
  IMAGE.innerText = content.image;
  MAIN_TEXT.innerText = content.main_text;
  QUESTION.innerText = content.question;
  NAVIGATION.append(createElement('div', {}, content?.navigation.map(
    ({ link, label, disabled, type }) => {
      return { element: 'a', attributes: { href: link, innerText: label, disabled, classList: type } };
    })));
}

const content = getContent('')
  .then(content => displayContent(content))
  .catch(error => {
    log(error.message, error, 'error');
    displayContent({
      image: 'error.image',
      main_text: 'Something went wrong.',
      navigation: [{ type: 'nav', label: 'Home', link: '/' }]
    })
  });

console.log('loded');

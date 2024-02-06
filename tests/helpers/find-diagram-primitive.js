import $ from 'jquery';

let findClassImputsByName = function(name) {
  let $classNames = $('.class-name-input');

  if ($classNames.length == 0) {
    return null;
  }

  let classNamesArray = $classNames.toArray()
  let classNameImput = classNamesArray.find((a) => {
    return $(a).val().includes(name);
  });

  if (classNameImput == null) {
    return null;
  }

  let parentNode = classNameImput.parentNode;
  let $parentNode = $(parentNode);

  return {
    name: $('.class-name-input', parentNode),
    stereotype: $('.class-stereotype-input', parentNode),
    attributes: $('.attributes-input', parentNode),
    methods: $('.methods-input', parentNode)
  }
};

export {
  findClassImputsByName
};

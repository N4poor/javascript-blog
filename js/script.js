"use strict";

{
  /* [DONE] add article selector */
  const optArticleSelector = '.post';
  /* [DONE] add title selector */
  const optTitleSelector = '.post-title';
  /* [DONE] add title list selector */
  const optTitleListSelector = '.titles';
  /* [DONE] add article tags selector */
  const optArticleTagsSelector = '.post-tags .list';
  /* [DONE] add article author selector */
  const optArticleAuthorSelector = '.post-author';

  /* Title Click Handler */
  const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault();
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for(let activeLink of activeLinks){
      activeLink.classList.remove("active");
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add("active");
    console.log('clickedElement' , clickedElement);
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active")
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove("active");
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add("active");
  };

  /* Generate Title Links function */
  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into html variable */
    html = html + linkHTML;
    }

    titleList.innerHTML = html;

    /* Repaired bug */
    const links = document.querySelectorAll(".titles a");
    for(let link of links){
      link.addEventListener("click", titleClickHandler);   
    }
  }

  /* Generate Tags function */
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  }

  /* Tag Click Handler */
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  /* Add Click Listeners To Tags function */
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a');
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  /* Generate Authors function */
  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article */
    for(let article of articles){
    /* get author from .post-author element */
    const authorElement = article.querySelector(optArticleAuthorSelector);
    const authorName = authorElement.innerHTML.replace('by ', '');
     /* add author to data-author attribute */
    article.setAttribute('data-author', authorName);
    /* create HTML of the link */
    const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';
    /* replace content of .post-author with the link */
    authorElement.innerHTML = 'by ' + linkHTML;
    /* END LOOP: for every article */
    }
  }

  /* Author Click Handler */
  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const authorName = href.replace('#author-', '');
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + authorName + '"]');
  }
  /* Add Click Listeners To Authors function */
  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
    /* START LOOP: for each link */
    for (let authorLink of authorLinks){
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
} 

  /* Call Generate Title Links function */
  generateTitleLinks();
  /* Call Generate Tags function */
  generateTags();
  /* Call Add Click Listeners To Tags function */
  addClickListenersToTags(); 
    /* Call Generate Authors function */
  generateAuthors();
  /* Call Add Click Listeners To Authors function */
  addClickListenersToAuthors();
}
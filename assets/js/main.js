/**
* Template Name: Nova
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

/*------------------
		Hero Slider
	--------------------*/


if($.isFunction('owlCarousel')){
  $('.hero__slider').owlCarousel({
    loop: true,
    dots: true,
    mouseDrag: false,
    navigation : true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    items: 1,
    margin: 0,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
});

}



  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  AOS.init({
    duration: 1000, // animation duration
    easing: 'ease-in-out', // animation easing
  });
  

});



const firebaseConfig = {
  apiKey: "AIzaSyDKkOYsXyAz7l-onRDOTYS0RwVGx8Vk4n8",
  authDomain: "studentwebapp-f1849.firebaseapp.com",
  projectId: "studentwebapp-f1849",
  storageBucket: "studentwebapp-f1849.appspot.com",
  messagingSenderId: "281704954231",
  appId: "1:281704954231:web:dda82b779c11684514c972",
  measurementId: "G-BDWXP5CJ8Y"
};
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var collectionRef = db.collection("students");

function submitForm() {
  var form = document.querySelector('.signup-form');
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value; // fixed typo
  var email = document.getElementById("email").value;
  var gender = document.getElementById("male").checked ? "male" : document.getElementById("female").checked ? "female" : document.getElementById("other").checked ? "other" : "";
  var maritalStatus = document.getElementById("single").checked ? "single" : document.getElementById("married").checked ? "married" : ""; // fixed the input value to match the checkbox IDs
  var profilePicture = document.getElementById("file").value;
  var age = document.getElementById("age").value;
  var bio = document.getElementById("bio").value; // fixed ID typo

  collectionRef.add({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    maritalStatus: maritalStatus,
    profilePicture: profilePicture,
    age: age,
    bio: bio
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
    form.reset();
 
  })}
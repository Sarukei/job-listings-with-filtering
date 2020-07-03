class JobPost {
  constructor(jobPostJSONObj) {
    // Since we're loading from JSON objects anyways
    Object.assign(this, jobPostJSONObj);
  }

  get jobTags() {
    return [this.role, this.level, ...this.languages, ...this.tools];
  }

  get specialTags() {
    const specialTags = [];

    if (this.new) {
      specialTags.push('NEW');
    }

    if (this.featured) {
      specialTags.push('FEATURED');
    }

    return specialTags;
  }

  get allTags() {
    const allTags = [...this.jobTags, ...this.specialTags];
    return allTags;
  }

  createJobPostHtml() {}
}

// class UICtrl {
// }

const FilterCtrl = (function () {})();

const UICtrl = (function () {
  const UISelectors = {
    searchBar: '.search-bar',
    jobPostContainer: '.job-container',
    jobPostTags: '.job-listing-card__content__job-tags',
  };

  const createJobPostElement = function (jobPost) {
    const jobPostEl = document.createElement('div');
    jobPostEl.setAttribute('id', jobPost.id);
    // Add job post card styling, and featured styling if featured
    jobPostEl.classList = `job-listing-card ${
      jobPost.featured ? 'featured' : ''
    }`;

    // jobPost HTML Tempalte
    jobPostEl.innerHTML = `
    
    <div class="job-listing-card__content">
    <div class="job-listing-card__content__details">
      <div class="job-listing-card__content__details__post-image-holder">
        <img
          src="${jobPost.logo}"
          alt=""
          class="job-listing-card__content__details__post-image-holder__image"
        />
      </div>
      <div class="job-listing-card__content__details__job-info">
        <div class="job-listing-card__content__details__job-info__header">
          <span
            class="job-listing-card__content__details__job-info__header__company-name"
            >${jobPost.company}</span
          >
          <div
            class="job-listing-card__content__details__job-info__header__post-tags"
          >
          ${createSpecialTags(jobPost.specialTags)}
          </div>
        </div>
        <h2
          class="job-listing-card__content__details__job-info__job-title"
        >
          ${jobPost.position}
        </h2>
        <ul
          class="job-listing-card__content__details__job-info__post-details"
        >
          <li
            class="job-listing-card__content__details__job-info__post-details__post-time"
          >
            ${jobPost.postedAt}
          </li>
          <li
            class="job-listing-card__content__details__job-info__post-details__job-contract"
          >
          ${jobPost.contract}
          </li>
          <li
            class="job-listing-card__content__details__job-info__post-details__job-location"
          >
            ${jobPost.location}
          </li>
        </ul>
      </div>
    </div>
    <div class="job-listing-card__content__job-tags">
    ${createJobTagElements(jobPost.jobTags)}
    </div>
  </div>
  `;

    // Add JobPostEl to the job post container
    document.querySelector(UISelectors.jobPostContainer).appendChild(jobPostEl);
  };

  const createSpecialTags = function (specialTags) {
    let specialTagHTML = ``;

    specialTags.forEach((tag) => {
      specialTagHTML += `
      <span class="job-listing-card__content__details__job-info__header__post-tags__tag tag-${tag.toLowerCase()} tag-filter"
      >${tag}</span>
      `;
    });

    return specialTagHTML;
  };

  const createJobTagElements = (jobTags) => {
    let jobTagHTML = '';

    jobTags.forEach((tag) => {
      jobTagHTML += `
      <span class="job-tag tag-filter">${tag}</span>
      `;
    });
    return jobTagHTML;
  };

  const showSearchBar = function () {
    const searchBar = document.querySelector(UISelectors.searchBar);
    // Show the search bar
    searchBar.classList.add('visible');
  };

  const hideSearchBar = function () {
    const searchBar = document.querySelector(UISelectors.searchBar);
    // Show the search bar
    searchBar.classList.remove('visible');
  };

  const filterJobs = function (filters) {};

  // Reveal access to public methods
  return {
    getSelectors: () => UISelectors,
    createJobPostElement: createJobPostElement,
    showSearchBar: showSearchBar,
  };
})();

const App = {
  init: async function (UICtrl) {
    console.log('App Initiatlizing');

    // Load in all the JSON job post data and convert to JobPost obj
    const jobPostData = (await (await fetch('./data.json')).json()).map(
      (jobPost) => new JobPost(jobPost)
    );

    const searchFilter = new Set();
    // Populate jobs from loaded json data
    jobPostData.forEach((jobpost) => UICtrl.createJobPostElement(jobpost));

    const getIdFromPost = function (post) {};

    const UISelectors = UICtrl.getSelectors();
    // Event delegation to listen for clicks on filter tags
    document
      .querySelector(UISelectors.jobPostContainer)
      .addEventListener('click', function (e) {
        if (e.target.classList.contains('tag-filter')) {
          const postId =
            e.target.parentElement.parentElement.parentElement.id ||
            e.target.parentElement.parentElement.parentElement.parentElement
              .parentElement.parentElement.id;

          searchFilter.add(e.target.textContent);
          console.log(searchFilter);

          // Go through every job post and keep only the ones that match the filters
          const filteredJobs = jobPostData.filter((jobPost) => {
            let containsFilters = true;

            // Go through all the filters and check if jobPost has the right tags
            for (filter of searchFilter) {
              if (!jobPost.allTags.includes(filter)) {
                containsFilters = false;
                break;
              }
            }

            return containsFilters;
          });
          console.log('FILTERED JOBS: ');
          filteredJobs.forEach((job) => {
            console.log(`${job.company} - ${job.allTags}`);
          });

          console.log(postId);
          UICtrl.showSearchBar();
        }
      });
  },
};
App.init(UICtrl);

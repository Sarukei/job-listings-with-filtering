// class JobPost {
//   constructor(jobPostJSONObj) {
//     // Since we're loading from JSON objects anyways
//     Object.assign(this, jobPostJSONObj);
//   }

//   get jobTags() {
//     return [this.role, this.level, ...this.languages, ...this.tools];
//   }

//   get allTags() {
//     const allTags = this.jobTags;
//     // Add featured and new as tags if true
//     if (this.featured) {
//       allTags.push('FEATURED');
//     }

//     if (this.new) {
//       allTags.push('NEW');
//     }

//     return allTags;
//   }
// }

const JobPostCtrl = (async function () {
  // Job Post Constructor
  const JobPost = function (jobPostObj) {
    Object.assign(this, jobPostJSONObj);
  };

  const loadJobsFromJSON = async () => {
    return await (await fetch('./data.json')).json();
  };

  const jobPosts = await loadJobsFromJSON();

  // Return public Methods
  return {
    loadJobs: loadJobsFromJSON,
    getJobs: function () {
      return jobPosts;
    },
  };
})();

const UICtrl = (function () {
  const createJobPostEl = (jobPost) => {
    const jobListCardEl = document.createElement('div');
    jobListCardEl.setAttribute('id', jobPost.id);
    jobListCardEl.classList = `job-listing-card ${
      jobPost.featured ? 'featured' : ''
    }`;
    jobListCardEl.innerHTML = `
    
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
    </div>
  </div>
  `;

    // Post Tag container el
    const postTagContainerEl = jobListCardEl.querySelector(
      '.job-listing-card__content__details__job-info__header__post-tags'
    );

    // Create post tags

    if (jobPost.featured) {
      // Create featured tag
      const featuredTag = document.createElement('span');
      featuredTag.className =
        'job-listing-card__content__details__job-info__header__post-tags__tag tag-featured tag-filter';

      featuredTag.innerText = 'Featured';
      postTagContainerEl.appendChild(featuredTag);
    }

    if (jobPost.new) {
      // Create new tag
      const newTag = document.createElement('span');
      newTag.className =
        'job-listing-card__content__details__job-info__header__post-tags__tag tag-new tag-filter';

      newTag.innerText = 'New';
      postTagContainerEl.appendChild(newTag);
    }

    // Create the job-tags
    const jobPostTags = [
      jobPost.role,
      jobPost.level,
      ...jobPost.languages,
      ...jobPost.tools,
    ];

    // Get the container for which to place the tags in
    const jobPostTagsContainerEl = jobListCardEl.querySelector(
      '.job-listing-card__content__job-tags'
    );

    jobPostTags.forEach((tag) => {
      // Create span element for tag
      const jobPostTagEl = document.createElement('span');
      jobPostTagEl.className = 'job-tag tag-filter';
      jobPostTagEl.textContent = tag;
      jobPostTagsContainerEl.appendChild(jobPostTagEl);
    });
    const jobPostContainer = document.querySelector('.job-container');
    jobPostContainer.appendChild(jobListCardEl);
  };
  return {
    populateJobs: function (jobs) {
      let html = '';

      jobs.forEach((job) => createJobPostEl(job));
    },
  };
})();

// const App = {
//   init: async () => {
//     const jobs = await JobPostCtrl.loadJobs();
//     console.log(jobs);
//   },
// };

const App = (function (JobPostCtrl, U) {
  // return access to Public Methods
  return {
    init: async function () {
      console.log('Initializing App..');
      // const jobs = await JobPostCtrl.loadJobs();
      // console.log(jobs);
      const jobs = (await JobPostCtrl).getJobs();

      UICtrl.populateJobs(jobs);
    },
  };
})(JobPostCtrl, UICtrl);

document.addEventListener('DOMContentLoaded', App.init);

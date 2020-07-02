const jobPostContainer = document.querySelector('.job-container');

// Returns JSON Data from data.json
const loadJSONData = async () => {
  let data = await (await fetch('./data.json')).json();

  return data;
};

const createJobPostElement = (jobPost) => {
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
          <span
            class="job-listing-card__content__details__job-info__header__post-tags__tag tag-new"
            >NEW!</span
          >
          <span
            class="job-listing-card__content__details__job-info__header__post-tags__tag tag-featured"
            >Featured</span
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
    <span class="job-tag">Frontend</span>
    <span class="job-tag">Senior</span>
    <span class="job-tag">HTML</span>
    <span class="job-tag">CSS</span>
    <span class="job-tag">JavaScript</span>
  </div>
</div>

  `;
  jobPostContainer.appendChild(jobListCardEl);
};

let jobPostsArr = [];

document.addEventListener('DOMContentLoaded', () => {
  loadJSONData().then((data) => {
    jobPostsArr = data;
    jobPostsArr.forEach((post) => createJobPostElement(post));
  });
});

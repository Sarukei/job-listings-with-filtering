let jobPostsArr = [];
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

  jobPostContainer.appendChild(jobListCardEl);
};

document.addEventListener('DOMContentLoaded', () => {
  loadJSONData().then((data) => {
    jobPostsArr = data;
    jobPostsArr.forEach((post) => createJobPostElement(post));
  });
});

jobPostContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('tag-filter')) {
    console.log(e.target);
  }
});

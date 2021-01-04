const ratings = [{
    website: 'Reviews',
    rating: 5
}, {
    website: 'Report Guru',
    rating: 5
}, {
    website: 'Best Tech',
    rating: 5
}];

const reviews = [
    {
        name: 'Sangeethakanna',
        type: 'Verifyied Buyer',
        comments: 'Awesome Product'
    }, {
        name: 'Alfred Edison',
        type: 'Verified Buyer',
        comments: 'Customer service is always excellent and very quick turn around. Completely delighted with the simplicity.'
    }
]

const reviewSection = document.getElementById("review-section");
const ratingSection = document.getElementById("rating-section");

function getReviewCard(review) {
    return `<article class='user-card'>
                <div class='user-details'>
                    <img >
                    <div>
                        <span class='user-name'>${review.name}</span>
                        <span class='user-type'>${review.type}</span>
                    </div>
                </div>
                <span class='user-comment'>
                   "${review.comments}"
                </span>
            <article>`;
}

const YELLOW_STAR = '<span class="star">&starf;</span>';
function getRatingCard(rating) {
    let appendStars = '';
    for (let index = 0; index < rating.rating; index++) {
        appendStars += YELLOW_STAR;
    }
    return `<article class="rating-container">
            <div class="stars">${appendStars}</div>
            <span class="rating">Rated ${rating.rating} in ${rating.website}</span></article>`;
}

function init() {
    emptyChildren(reviewSection, ratingSection);
    reviews.forEach(review => reviewSection.insertAdjacentHTML('beforeend', getReviewCard(review)));
    ratings.forEach(rating => ratingSection.insertAdjacentHTML('beforeend', getRatingCard(rating)))
}

init();

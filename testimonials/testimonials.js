const users = [{
    id: 0,
    name: 'Tanya Sinclair',
    job: 'UX Engineer',
    testimonial: "I've have been interested in coding for a while but I have never taken the jump, until now. I could'nt recommend this course enough.I'm now in the job of my dream and so excited about the future.",
    img: 'image-tanya'
}, {
    id: 1,
    name: 'John Tarkpor',
    job: 'Junior Front End Developer',
    testimonial: "If you want to lay the best foundation possible I'd recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer",
    img: 'image-john'
}];

const userDetails = document.getElementById("user-details");
const currentUser = users[0];

const disableNavigationButtons = (selectedUser) => {
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn')
    nextButton.removeAttribute('disabled');
    prevButton.removeAttribute('disabled');
    if (selectedUser.id === users[0].id) {
        prevButton.setAttribute('disabled', 'true');
    } else if (selectedUser.id === users[users.length - 1].id) {
        nextButton.setAttribute('disabled', 'true');
    }
}

const renderUserDetails = (selectedUser) => {
    return `<article class="quote-article">
                <span class="user-testimonial">
                    ${selectedUser.testimonial}
                </span>
                <div class="user-job-name">
                    <span class="user-name">${selectedUser.name}</span><span class="user-job">${selectedUser.job}</span>
                </div>
            </article>
            <article class="avator">
                <picture>
                    <img class="user-image" src="./testimonials/images/${selectedUser.img}.jpg">
                </picture>
                <div class="navigation-buttons">
                    <button id="prevBtn" userid="${selectedUser.id}" onclick="showPrevTestimonial(event)"><img src="./testimonials/images/icon-prev.svg"></button>
                    <button id="nextBtn" userid="${selectedUser.id}" onclick="showNextTestimonial(event)"><img src="./testimonials/images/icon-next.svg"></button>
                </div>
            </article>`
}

const showPrevTestimonial = (event) => {
    const selectedUserId = parseInt(event.currentTarget.getAttribute('userid')) - 1;
    const selectedUser = users.filter(user => user.id === selectedUserId)[0];
    disableNavigationButtons(selectedUser);
    userDetails.innerHTML = renderUserDetails(selectedUser);
}

const showNextTestimonial = (event) => {
    console.log(event.currentTarget.getAttribute('userid'))
    const selectedUserId = parseInt(event.currentTarget.getAttribute('userid')) + 1;
    const selectedUser = users.filter(user => user.id === selectedUserId)[0];
    disableNavigationButtons(selectedUser);
    userDetails.innerHTML = renderUserDetails(selectedUser);
}

//Render first user on load
userDetails.innerHTML = renderUserDetails(users.filter(user => user.id === 0)[0]);
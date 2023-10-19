async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  // Array for the two needed endpoints
  const Endpoints = [
    'http://localhost:3003/api/mentors',
    'http://localhost:3003/api/learners',
  ];

  try {
    const promises = Endpoints.map(url => axios.get(url));
    const responses = await Promise.all(promises);
    const [mentorsReponse, learnersResponse] = responses
    const mentors = mentorsReponse.data;
    let learners = learnersResponse.data;

    learners.forEach(learner => {
      const mentorNames = learner.mentors.map(number => {
        const currentMentor = mentors.find(mentor => mentor.id === number);
        return currentMentor.firstName + " " + currentMentor.lastName;
      })
      learner.mentors = mentorNames;
    });
    console.log(learners)
    createLearnerCard(learners);

  } catch (error) {
    console.error('Error: ', error);
  }

  function createLearnerCard (learners) {
    // create learner cards from the learners array
    console.log("test");
  }
  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()

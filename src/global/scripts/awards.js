const descriptions = {
    "Autonomous Award": "Celebrates the team that demonstrates consistent, reliable, and high-performing robot operation during the autonomous phase of the match.",
    "Championship Division Finalist": "Celebrates the team members of the alliance that reaches the finals in a division at the FIRST Championship.",
    "District Championship Division Finalist": "Celebrates the team members of the alliance that reaches the finals in a division at a District Championship.",
    "District Championship Division Winner": "Celebrates the team members of the alliance that wins a division at a District Championship.",
    "District Event Finalist": "Celebrates the team members of the alliance that reaches the finals at a District Event.",
    "District Event Winner": "Celebrates the team members of the alliance that wins a District Event.",
    "Entrepreneurship Award": "Celebrates a team that has developed the framework, comprehensive business plan, and resources necessary to undertake a complete team operational project.",
    "Excellence in Engineering Award": "Celebrates the team whose machine incorporates an engineering solution designed to have components work together seamlessly.",
    "Gracious Professionalism Award": "Celebrates outstanding demonstration of FIRST Core Values such as continuous Gracious Professionalism®, sportsmanship, and working together both on and off the playing field.",
    "Industrial Design Award": "Celebrates the team whose machine demonstrates industrial design principles, striking a balance between form, function, and aesthetics.",
    "Innovation in Control Award": "Celebrates an innovative control system feature (hardware, software, or sensor integration) that provides a unique strategy or robot function during match play.",
    "Judges' Award": "During the course of the competition, the judging panel may decide a team's unique efforts, performance, or dynamics merit recognition.",
    "Quality Award": "Celebrates machine robustness in concept and fabrication.",
    "Rookie All-Star Award": "Celebrates the rookie team exemplifying a young but strong partnership effort, as well as implementing the mission of FIRST to inspire students to learn more about science and technology.",
    "Rookie Inspiration Award": "Celebrates a young team's outstanding success in advancing respect and appreciation for engineering within a team's school and community.",
    "Team Spirit Award": "Celebrates extraordinary enthusiasm and spirit through exceptional partnership and teamwork furthering the objectives of FIRST.",
    "Team Sustainability Award": "Celebrates a team that has demonstrated sustainable practices, clear financial planning, and continuous community outreach to ensure long-term stability and success."
}

const awards = document.querySelectorAll('.award-card');
awards.forEach(award => {
    award.addEventListener('mouseover', () => {
        const detailsHoverElement = document.createElement('div');
        detailsHoverElement.classList.add('card-details');
        detailsHoverElement.textContent = descriptions[award.querySelector('h2').textContent];
        award.appendChild(detailsHoverElement);
    });
    award.addEventListener('mouseout', () => {
        const detailsHoverElement = award.querySelector('.card-details');
        if (detailsHoverElement) {
            award.removeChild(detailsHoverElement);
        }
    });
});
const appendAlert = (message, type, alertPlaceholder) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');
  alertPlaceholder.append(wrapper);
};

const message = "<ul><li>In the Shared with input field the usernames must be separated by comma without spaces.</li>"+
  "<li>The Quotas input field must be in the same format of Shared with and the quotas order must be consistent with the users order.</li>"+
  "<li>For example, if we have three users: tom10 with a quota of 50, mark55 with a quota of 40 and jim_jr with a quota of 30, the input fields must be:<br>"+
  "Shared with: tom10,mark55,jim_jr<br>"+
  "Quotas: 50,40,30</li></ul>";
const alertTrigger = document.getElementById('help_insert_btn');
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert(message, 'light', document.getElementById('help_insert_alert'));
  });
}

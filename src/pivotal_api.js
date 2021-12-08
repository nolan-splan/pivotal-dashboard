const headers = new Headers({ 'X-TrackerToken': process.env.REACT_APP_PIVOTAL_API_TOKEN })
export function fetchMe() {
  var options = { method: 'GET', headers: headers }
  performRequest("https://www.pivotaltracker.com/services/v5/me", options)
}

export function fetchMyPeople(callback) {
  var options = { method: 'GET', headers: headers }
  performRequest("https://www.pivotaltracker.com/services/v5/my/people?project_id=866453", options)
    .then(res => res.json())
    .then(json => callback(json))
}

export function fetchMyNotifications() {
  var options = { method: 'GET', headers: headers }
  performRequest("https://www.pivotaltracker.com/services/v5/my/notifications?envelope=true", options)
}

export function fetchMyProjects() {
  var options = { method: 'GET', headers: headers }
  performRequest("https://www.pivotaltracker.com/services/v5/projects", options)
}

export function fetchProject(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`https://www.pivotaltracker.com/services/v5/projects/${projectId}`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export function fetchIterations(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/iterations?scope=done&offset=-4&limit=4`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export function fetchProjectMemberships(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/memberships`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

function performRequest(url, options) {
  return fetch(url, options)
}
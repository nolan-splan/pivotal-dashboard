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

export function fetchCurrentIteration(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/iterations?scope=current&limit=1`, options)
    .then(res => res.json())
    .then(json => callback(json[0]))
}

export function fetchProjectMemberships(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/memberships`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export async function fetchStoryTransitions(projectId, storyIds, callback) {
  try {
    var options = { method: 'GET', headers: headers }
    const urls = storyIds.map(id => `https://www.pivotaltracker.com/services/v5/projects/${projectId}/stories/${id}/transitions`)

    const requests = urls.map((url) => fetch(url, options))
    const responses = await Promise.all(requests)

    const errors = responses.filter((response) => !response.ok)

    if (errors.length > 0) {
      throw errors.map((response) => Error(response.statusText))
    }

    const json = responses.map((response) => response.json())
    const data = await Promise.all(json)

    callback(data.flat())
  }
  catch (errors) {
    errors.forEach((error) => console.error("Error: ", error))
  }

}

function performRequest(url, options) {
  return fetch(url, options)
}
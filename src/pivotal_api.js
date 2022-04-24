const headers = new Headers({ 'X-TrackerToken': process.env.REACT_APP_PIVOTAL_API_TOKEN })

const baseUrl = "https://www.pivotaltracker.com/services/v5"

export function fetchMe() {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/me`, options)
}

export function fetchMyPeople(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/my/people`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export function fetchMyNotifications() {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/my/notifications?envelope=true`, options)
}

export function fetchMyProjects(callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/projects`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export function fetchProject(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/projects/${projectId}`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export async function fetchIterations(projectId, callback) {
  var options = { method: 'GET', headers: headers }

  // Max limit is 50 :(
  const offsets = [50, 100, 150, 200]

  const urls = offsets.map(n => {
    return `${baseUrl}/projects/${projectId}/iterations?scope=done&offset=${n}&limit=50`
  })

  const requests = urls.map((url) => fetch(url, options))
  const responses = await Promise.all(requests)

  const errors = responses.filter((response) => !response.ok)

  if (errors.length > 0) {
    throw errors.map((response) => Error(response.statusText))
  }

  const json = responses.map((response) => response.json())
  const data = await Promise.all(json)

  callback(data.flat())

  // var url = `${baseUrl}/projects/${projectId}/iterations?offset=50&limit=300`

  // performRequest(url, options)
  //   .then(res => res.json())
  //   .then(json => callback(json))
}

export function fetchCurrentIteration(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/projects/${projectId}/iterations?scope=current&limit=1`, options)
    .then(res => res.json())
    .then(json => callback(json[0]))
}

export function fetchIteration(projectId, iterationNumber, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/projects/${projectId}/iterations/${iterationNumber}`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export function fetchProjectMemberships(projectId, callback) {
  var options = { method: 'GET', headers: headers }
  performRequest(`${baseUrl}/projects/${projectId}/memberships`, options)
    .then(res => res.json())
    .then(json => callback(json))
}

export async function fetchStoryTransitions(projectId, storyIds, callback) {
  try {
    var options = { method: 'GET', headers: headers }
    const urls = storyIds.map(id => `${baseUrl}/projects/${projectId}/stories/${id}/transitions`)

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
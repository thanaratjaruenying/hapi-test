'use strict';

const nock = require('nock')

const { init } = require('./server');

const appending1 = require('./source/appending1');
const appending2 = require('./source/appending2');

describe('POST /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/',
            payload: appending1
        });

        expect(res.statusCode).toBe(200);
        expect(res.result).toEqual(appending2);
    });

    it('responds with 200 and empty result', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/',
        });

        expect(res.statusCode).toBe(200);
        expect(res.result).toEqual([]);
    });
});

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const data = [{
            "id": 102,
            "node_id": "MDEwOlJlcG9zaXRvcnkxMDI=",
            "name": "gsa-prototype",
            "full_name": "jnewland/gsa-prototype",
            "private": false,
            "owner": {
                "login": "jnewland",
                "id": 47,
                "node_id": "MDQ6VXNlcjQ3",
                "avatar_url": "https://avatars.githubusercontent.com/u/47?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/jnewland",
                "html_url": "https://github.com/jnewland",
                "followers_url": "https://api.github.com/users/jnewland/followers",
                "following_url": "https://api.github.com/users/jnewland/following{/other_user}",
                "gists_url": "https://api.github.com/users/jnewland/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/jnewland/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/jnewland/subscriptions",
                "organizations_url": "https://api.github.com/users/jnewland/orgs",
                "repos_url": "https://api.github.com/users/jnewland/repos",
                "events_url": "https://api.github.com/users/jnewland/events{/privacy}",
                "received_events_url": "https://api.github.com/users/jnewland/received_events",
                "type": "User",
                "site_admin": false
            },
            "html_url": "https://github.com/jnewland/gsa-prototype",
            "description": "Prototype/Javascript wrapper for the Google Search Appliance Search Protocol. Fancy cross-domain JSON support included.",
            "fork": false,
            "url": "https://api.github.com/repos/jnewland/gsa-prototype",
            "forks_url": "https://api.github.com/repos/jnewland/gsa-prototype/forks",
            "keys_url": "https://api.github.com/repos/jnewland/gsa-prototype/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/jnewland/gsa-prototype/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/jnewland/gsa-prototype/teams",
            "hooks_url": "https://api.github.com/repos/jnewland/gsa-prototype/hooks",
            "issue_events_url": "https://api.github.com/repos/jnewland/gsa-prototype/issues/events{/number}",
            "events_url": "https://api.github.com/repos/jnewland/gsa-prototype/events",
            "assignees_url": "https://api.github.com/repos/jnewland/gsa-prototype/assignees{/user}",
            "branches_url": "https://api.github.com/repos/jnewland/gsa-prototype/branches{/branch}",
            "tags_url": "https://api.github.com/repos/jnewland/gsa-prototype/tags",
            "blobs_url": "https://api.github.com/repos/jnewland/gsa-prototype/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/jnewland/gsa-prototype/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/jnewland/gsa-prototype/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/jnewland/gsa-prototype/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/jnewland/gsa-prototype/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/jnewland/gsa-prototype/languages",
            "stargazers_url": "https://api.github.com/repos/jnewland/gsa-prototype/stargazers",
            "contributors_url": "https://api.github.com/repos/jnewland/gsa-prototype/contributors",
            "subscribers_url": "https://api.github.com/repos/jnewland/gsa-prototype/subscribers",
            "subscription_url": "https://api.github.com/repos/jnewland/gsa-prototype/subscription",
            "commits_url": "https://api.github.com/repos/jnewland/gsa-prototype/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/jnewland/gsa-prototype/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/jnewland/gsa-prototype/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/jnewland/gsa-prototype/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/jnewland/gsa-prototype/contents/{+path}",
            "compare_url": "https://api.github.com/repos/jnewland/gsa-prototype/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/jnewland/gsa-prototype/merges",
            "archive_url": "https://api.github.com/repos/jnewland/gsa-prototype/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/jnewland/gsa-prototype/downloads",
            "issues_url": "https://api.github.com/repos/jnewland/gsa-prototype/issues{/number}",
            "pulls_url": "https://api.github.com/repos/jnewland/gsa-prototype/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/jnewland/gsa-prototype/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/jnewland/gsa-prototype/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/jnewland/gsa-prototype/labels{/name}",
            "releases_url": "https://api.github.com/repos/jnewland/gsa-prototype/releases{/id}",
            "deployments_url": "https://api.github.com/repos/jnewland/gsa-prototype/deployments"
        }]

        const scope = nock('https://api.github.com')
            .get('/repositories?accept=application%2Fvnd.github.v3%2Bjson&since=0')
            .reply(200, {
                data
            })

        const res = await server.inject({
            method: 'get',
            url: '/'
        });

        expect(res.statusCode).toBe(200);
        expect(res.result.data).toEqual(data);

        scope.done()
    });
})

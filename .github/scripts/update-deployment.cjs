// @ts-check

/**
 *
 * @param {Object} obj - An object.
 * @param {import("@octokit/rest").Octokit} obj.github
 * @param {import("@actions/github").context} obj.context
 * @param {import("@actions/core")} obj.core
 */
async function script({ github, context, core }) {
	const githubBranch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME;
	const productionEnvironment = githubBranch === 'main';
	const environmentName = `[site] (${productionEnvironment ? 'Production' : githubBranch})`;

	github.rest.repos.createDeploymentStatus({
		owner: context.repo.owner,
		repo: context.repo.repo,
		deployment_id: Number.parseInt(process.env.DEPLOYMENT_ID),
		environment: environmentName,
		environment_url: process.env.DEPLOYMENT_URL,
		production_environment: productionEnvironment,
		description: 'Cloudflare Pages',
		state: 'success',
		auto_inactive: false,
	});
}

module.exports = script;

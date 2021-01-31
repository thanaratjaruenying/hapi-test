'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi')
const Pack = require('../../package');
const { Octokit } = require("@octokit/core");
const { join } = require('path');
const octokit = new Octokit({ auth: process.env.TOKEN || '' });

const server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
        cors: true
    }
});

server.route({
    method: 'GET',
    path: '/',
    options: {
        tags: ['api'],
        notes: ['Get github repos'],
        response: {
            status: {
                200: Joi.array().items()
            }
        },
        validate: {
            query: Joi.object({
                since: Joi.number()
            }),
        }
    },
    handler: async (req, res) => {
        const since = req.query.since || 0;

        try {
            const response = await octokit.request('GET /repositories', { accept: 'application/vnd.github.v3+json', since });

            return response.data;
        } catch (error) {
            return error.message;
        }
    }
});

server.route({
    method: 'POST',
    path: '/',
    options: {
        tags: ['api'],
        notes: ['Post add chrildren to their parent array'],
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object({
                        id: Joi.number(),
                        title: Joi.any(),
                        level: Joi.number(),
                        children: Joi.any(),
                        parent_id: Joi.number().allow(null)
                    })
                )
            }
        },
        validate: {
            payload: Joi.object()
        }
    },
    handler: function (req, res) {
        const payload = req.payload;

        if (payload !== null) {
            const keys = Object.keys(payload);
            const sortedKeys = keys.sort((a, b) => a - b);

            const result = sortedKeys.reduceRight((childs, curr) => {
                const parents = payload[curr];

                if (childs.length > 0) {
                    let newChilds = [...childs]

                    const noParent = []
                    parents.forEach(parent => {
                        newChilds.find(c => {
                            if (parent.id === c.parent_id) {
                                parent.children.push(c)
                            } else {
                                noParent.push(c)
                            }
                        })
                    });
                    parents.concat(noParent);
                    return parents
                } else {
                    childs.push(...parents)
                    return childs;
                }
            }, [])


            return result;
        } else {
            return [];
        }
    }
});

exports.init = async () => {
    await server.initialize();
    return server;
};

exports.start = async () => {
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

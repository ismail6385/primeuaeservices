#!/usr/bin/env node
/**
 * Supabase MCP Server
 * Provides tools to interact with Supabase database and authentication
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('⚠️ Supabase credentials missing!');
    process.exit(1);
}
// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = SUPABASE_SERVICE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    : supabase;
// Create MCP server
const server = new Server({
    name: 'supabase-mcp-server',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
        resources: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'query_table',
                description: 'Query data from a Supabase table. Supports filtering, sorting, and pagination.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'Name of the table to query (e.g., tickets, admin_settings)',
                        },
                        select: {
                            type: 'string',
                            description: 'Columns to select (default: *)',
                            default: '*',
                        },
                        filter: {
                            type: 'object',
                            description: 'Filter conditions (e.g., {status: "open"})',
                        },
                        orderBy: {
                            type: 'string',
                            description: 'Column to order by',
                        },
                        orderDirection: {
                            type: 'string',
                            enum: ['asc', 'desc'],
                            description: 'Sort direction',
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number of rows to return',
                        },
                    },
                    required: ['table'],
                },
            },
            {
                name: 'insert_record',
                description: 'Insert a new record into a Supabase table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'Name of the table',
                        },
                        data: {
                            type: 'object',
                            description: 'Data to insert',
                        },
                    },
                    required: ['table', 'data'],
                },
            },
            {
                name: 'update_record',
                description: 'Update records in a Supabase table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'Name of the table',
                        },
                        filter: {
                            type: 'object',
                            description: 'Filter conditions to identify records to update',
                        },
                        data: {
                            type: 'object',
                            description: 'Data to update',
                        },
                    },
                    required: ['table', 'filter', 'data'],
                },
            },
            {
                name: 'delete_record',
                description: 'Delete records from a Supabase table',
                inputSchema: {
                    type: 'object',
                    properties: {
                        table: {
                            type: 'string',
                            description: 'Name of the table',
                        },
                        filter: {
                            type: 'object',
                            description: 'Filter conditions to identify records to delete',
                        },
                    },
                    required: ['table', 'filter'],
                },
            },
            {
                name: 'get_user',
                description: 'Get user information from Supabase Auth',
                inputSchema: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                            description: 'User ID (UUID)',
                        },
                        email: {
                            type: 'string',
                            description: 'User email address',
                        },
                    },
                },
            },
            {
                name: 'list_users',
                description: 'List all users in Supabase Auth',
                inputSchema: {
                    type: 'object',
                    properties: {
                        limit: {
                            type: 'number',
                            description: 'Maximum number of users to return',
                            default: 50,
                        },
                    },
                },
            },
            {
                name: 'create_user',
                description: 'Create a new user in Supabase Auth',
                inputSchema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'User email address',
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                        },
                        emailConfirmed: {
                            type: 'boolean',
                            description: 'Whether email is confirmed',
                            default: true,
                        },
                    },
                    required: ['email', 'password'],
                },
            },
            {
                name: 'update_user_password',
                description: 'Update a user password in Supabase Auth',
                inputSchema: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                            description: 'User ID (UUID)',
                        },
                        newPassword: {
                            type: 'string',
                            description: 'New password',
                        },
                    },
                    required: ['userId', 'newPassword'],
                },
            },
        ],
    };
});
// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'supabase://tickets',
                name: 'Tickets Table',
                description: 'Access to the tickets table',
                mimeType: 'application/json',
            },
            {
                uri: 'supabase://admin_settings',
                name: 'Admin Settings Table',
                description: 'Access to admin settings table',
                mimeType: 'application/json',
            },
            {
                uri: 'supabase://users',
                name: 'Supabase Users',
                description: 'Access to Supabase Auth users',
                mimeType: 'application/json',
            },
        ],
    };
});
// Read resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    try {
        if (uri === 'supabase://tickets') {
            const { data, error } = await supabase.from('tickets').select('*').limit(100);
            if (error)
                throw error;
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(data, null, 2),
                    },
                ],
            };
        }
        if (uri === 'supabase://admin_settings') {
            const { data, error } = await supabase.from('admin_settings').select('*');
            if (error)
                throw error;
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(data, null, 2),
                    },
                ],
            };
        }
        if (uri === 'supabase://users') {
            const { data, error } = await supabaseAdmin.auth.admin.listUsers();
            if (error)
                throw error;
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(data.users, null, 2),
                    },
                ],
            };
        }
        throw new Error(`Unknown resource: ${uri}`);
    }
    catch (error) {
        throw new Error(`Failed to read resource: ${error.message}`);
    }
});
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case 'query_table': {
                const { table, select = '*', filter, orderBy, orderDirection, limit } = args;
                let query = supabase.from(table).select(select);
                if (filter) {
                    Object.entries(filter).forEach(([key, value]) => {
                        query = query.eq(key, value);
                    });
                }
                if (orderBy) {
                    query = query.order(orderBy, { ascending: orderDirection !== 'desc' });
                }
                if (limit) {
                    query = query.limit(limit);
                }
                const { data, error } = await query;
                if (error)
                    throw error;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            }
            case 'insert_record': {
                const { table, data } = args;
                const { data: result, error } = await supabase.from(table).insert(data).select();
                if (error)
                    throw error;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            }
            case 'update_record': {
                const { table, filter, data } = args;
                let query = supabase.from(table).update(data);
                Object.entries(filter).forEach(([key, value]) => {
                    query = query.eq(key, value);
                });
                const { data: result, error } = await query.select();
                if (error)
                    throw error;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            }
            case 'delete_record': {
                const { table, filter } = args;
                let query = supabase.from(table).delete();
                Object.entries(filter).forEach(([key, value]) => {
                    query = query.eq(key, value);
                });
                const { data: result, error } = await query.select();
                if (error)
                    throw error;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            }
            case 'get_user': {
                const { userId, email } = args;
                let user;
                if (userId) {
                    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
                    if (error)
                        throw error;
                    user = data.user;
                }
                else if (email) {
                    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
                    if (error)
                        throw error;
                    user = data.users.find((u) => u.email === email);
                }
                else {
                    throw new Error('Either userId or email must be provided');
                }
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(user, null, 2),
                        },
                    ],
                };
            }
            case 'list_users': {
                const { limit = 50 } = args;
                const { data, error } = await supabaseAdmin.auth.admin.listUsers();
                if (error)
                    throw error;
                const users = data.users.slice(0, limit);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(users, null, 2),
                        },
                    ],
                };
            }
            case 'create_user': {
                const { email, password, emailConfirmed = true } = args;
                const { data, error } = await supabaseAdmin.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: emailConfirmed,
                });
                if (error)
                    throw error;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data.user, null, 2),
                        },
                    ],
                };
            }
            case 'update_user_password': {
                const { userId, newPassword } = args;
                const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
                    password: newPassword,
                });
                if (error)
                    throw error;
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data.user, null, 2),
                        },
                    ],
                };
            }
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Supabase MCP Server running on stdio');
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=supabase-server.js.map
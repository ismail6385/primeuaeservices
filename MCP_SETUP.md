# Supabase MCP Server Setup Guide

## Overview

This project includes a Model Context Protocol (MCP) server for Supabase integration. The MCP server allows AI assistants to directly interact with your Supabase database and authentication system.

## Features

The MCP server provides the following tools:

### Database Operations
- **query_table**: Query data from any Supabase table with filtering, sorting, and pagination
- **insert_record**: Insert new records into tables
- **update_record**: Update existing records
- **delete_record**: Delete records from tables

### Authentication Operations
- **get_user**: Get user information by ID or email
- **list_users**: List all users in Supabase Auth
- **create_user**: Create new users in Supabase Auth
- **update_user_password**: Update user passwords

### Resources
- **supabase://tickets**: Access tickets table
- **supabase://admin_settings**: Access admin settings table
- **supabase://users**: Access Supabase Auth users

## Installation

1. **Install MCP SDK dependencies:**
   ```bash
   cd mcp-server
   npm install
   ```

2. **Build the TypeScript server:**
   ```bash
   npm run build
   ```

3. **Make the server executable:**
   ```bash
   chmod +x supabase-server.js
   ```

## Configuration

### For Cursor IDE

Add the following to your Cursor settings (`.cursor/mcp.json` or Cursor settings):

```json
{
  "mcpServers": {
    "supabase": {
      "command": "node",
      "args": [
        "D:\\primeuaeservices\\mcp-server\\supabase-server.js"
      ],
      "env": {
        "NEXT_PUBLIC_SUPABASE_URL": "https://rczwblcyzomiiqihljua.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key-here",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key-here"
      }
    }
  }
}
```

### For VS Code with MCP Extension

1. Install the MCP extension
2. Add configuration to `.vscode/settings.json`:

```json
{
  "mcp.servers": {
    "supabase": {
      "command": "node",
      "args": [
        "${workspaceFolder}/mcp-server/supabase-server.js"
      ],
      "env": {
        "NEXT_PUBLIC_SUPABASE_URL": "https://rczwblcyzomiiqihljua.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key-here",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key-here"
      }
    }
  }
}
```

## Usage Examples

### Query Tickets
```
Query all open tickets from the tickets table
```

### Create User
```
Create a new admin user with email admin@example.com and password SecurePass123
```

### Update Ticket Status
```
Update ticket with id 123 to status 'closed'
```

### List Users
```
List all users in Supabase Auth
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Service Role Key**: The `SUPABASE_SERVICE_ROLE_KEY` has full access to your database. Never expose it in client-side code.

2. **Environment Variables**: Keep all keys in `.env.local` and never commit them to version control.

3. **RLS Policies**: Make sure Row Level Security (RLS) is enabled on your tables with appropriate policies.

4. **MCP Server Access**: Only trusted AI assistants should have access to the MCP server.

## Troubleshooting

### Server Not Starting
- Check that Node.js is installed and in PATH
- Verify environment variables are set correctly
- Check file permissions on `supabase-server.js`

### Connection Errors
- Verify Supabase URL and keys are correct
- Check network connectivity
- Review Supabase project settings

### Permission Errors
- Ensure RLS policies allow the operations
- Check that service role key has necessary permissions
- Verify table names and column names are correct

## Development

### Building
```bash
cd mcp-server
npm run build
```

### Testing
You can test the server manually:
```bash
cd mcp-server
node supabase-server.js
```

## Support

For issues or questions:
1. Check Supabase dashboard for database errors
2. Review MCP server logs
3. Verify environment variables
4. Check Cursor/IDE MCP configuration


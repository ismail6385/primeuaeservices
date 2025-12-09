# Supabase MCP Server

## Quick Setup for Cursor

### Step 1: Build the Server
```bash
cd mcp-server
npm install
npm run build
```

### Step 2: Configure Cursor

Add this to your Cursor settings (File → Preferences → Settings → search "MCP"):

**Option A: Via Cursor Settings UI**
1. Open Cursor Settings
2. Search for "MCP" or "Model Context Protocol"
3. Add new server configuration:

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
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjendibGN5em9taWlxaWhsanVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTEwMDgsImV4cCI6MjA4MDU2NzAwOH0.-CdRRPK3iOw3IUHMpacwlZHbxeOmCgg0uYt9zPaWX6s",
        "SUPABASE_SERVICE_ROLE_KEY": "sb_publishable_S1E3Bwor8XFpCop1KDwoJQ_F6k6Vqfd"
      }
    }
  }
}
```

**Option B: Via Config File**

Create or edit `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "node",
      "args": [
        "${workspaceFolder}/mcp-server/supabase-server.js"
      ],
      "env": {
        "NEXT_PUBLIC_SUPABASE_URL": "https://rczwblcyzomiiqihljua.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjendibGN5em9taWlxaWhsanVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTEwMDgsImV4cCI6MjA4MDU2NzAwOH0.-CdRRPK3iOw3IUHMpacwlZHbxeOmCgg0uYt9zPaWX6s",
        "SUPABASE_SERVICE_ROLE_KEY": "sb_publishable_S1E3Bwor8XFpCop1KDwoJQ_F6k6Vqfd"
      }
    }
  }
}
```

### Step 3: Restart Cursor

After configuration, restart Cursor IDE to load the MCP server.

## Available Tools

### Database Operations
- `query_table` - Query any table with filters
- `insert_record` - Insert new records
- `update_record` - Update existing records
- `delete_record` - Delete records

### User Management
- `get_user` - Get user by ID or email
- `list_users` - List all users
- `create_user` - Create new user
- `update_user_password` - Update user password

## Usage Examples

**Query tickets:**
```
Query all open tickets from the tickets table
```

**Create admin user:**
```
Create a new admin user with email admin@example.com and password SecurePass123
```

**Update ticket:**
```
Update ticket with id 123 to status 'closed'
```

## Troubleshooting

1. **Server not found**: Make sure path to `supabase-server.js` is correct
2. **Environment variables**: Verify all keys are set correctly
3. **Build errors**: Run `npm run build` in mcp-server directory
4. **Permission errors**: Check Supabase RLS policies


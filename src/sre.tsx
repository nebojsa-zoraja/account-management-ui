import React, { useState } from "react";

const GroupManagement = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Marketing Team",
      description: "Marketing and promotion team",
      members: ["john@example.com", "jane@example.com", "mike@example.com"],
    },
    {
      id: 2,
      name: "Development Team",
      description: "Software development team",
      members: ["sarah@example.com", "tom@example.com"],
    },
    {
      id: 3,
      name: "Design Team",
      description: "UI/UX design team",
      members: ["alex@example.com", "lisa@example.com"],
    },
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState<any>(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState<any>(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState<any>(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [newUser, setNewUser] = useState({ email: "", groupId: "" });

  const handleCreateGroup = () => {
    if (newGroup.name) {
      setGroups([
        ...groups,
        {
          id: Date.now(),
          name: newGroup.name,
          description: newGroup.description,
          members: [],
        },
      ]);
      setNewGroup({ name: "", description: "" });
      setCreateDialogOpen(false);
    }
  };

  const handleAddUser = () => {
    if (newUser.email && newUser.groupId) {
      setGroups(
        groups.map((group) =>
          group.id === parseInt(newUser.groupId)
            ? { ...group, members: [...group.members, newUser.email] }
            : group
        )
      );
      setNewUser({ email: "", groupId: "" });
      setAddUserDialogOpen(false);
    }
  };

  const handleDeleteGroup = (id: any) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  const handleRemoveMember = (groupId: any, memberEmail: any) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.filter((m) => m !== memberEmail),
            }
          : group
      )
    );
  };

  const openDetails = (group: any) => {
    setSelectedGroup(group);
    setDetailsDialogOpen(true);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        .container {
          min-height: 100vh;
          background-color: #dee2e6;
          padding: 32px;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .title {
          color: #3A3A3A;
          font-size: 32px;
          font-weight: 600;
          margin: 0 0 32px 0;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 80px;
        }
        
        .card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .icon-group {
          width: 24px;
          height: 24px;
          margin-right: 12px;
          color: #951414;
        }
        
        .card-title {
          color: #3A3A3A;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        
        .card-description {
          color: #3A3A3A;
          font-size: 14px;
          margin: 0 0 16px 0;
          flex-grow: 1;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          background-color: #dee2e6;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          color: #3A3A3A;
          margin-bottom: 16px;
          width: fit-content;
        }
        
        .badge-icon {
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
        
        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .btn {
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
          border: none;
          font-family: inherit;
        }
        
        .btn-text {
          background-color: transparent;
          color: #951414;
        }
        
        .btn-text:hover {
          background-color: rgba(149, 20, 20, 0.08);
        }
        
        .btn-icon {
          background-color: transparent;
          color: #951414;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-icon:hover {
          background-color: rgba(149, 20, 20, 0.08);
        }
        
        .btn-primary {
          background-color: #951414;
          color: #ffffff;
          padding: 10px 20px;
        }
        
        .btn-primary:hover {
          background-color: #7a1010;
        }
        
        .btn-secondary {
          background-color: transparent;
          color: #3A3A3A;
          padding: 10px 20px;
        }
        
        .btn-secondary:hover {
          background-color: rgba(58, 58, 58, 0.05);
        }
        
        .fab-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          gap: 16px;
        }
        
        .fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #951414;
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.2s;
          font-size: 24px;
        }
        
        .fab:hover {
          background-color: #7a1010;
          transform: scale(1.1);
        }
        
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .dialog {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow: auto;
        }
        
        .dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .dialog-title {
          color: #3A3A3A;
          margin: 0;
          font-size: 24px;
          display: flex;
          align-items: center;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          display: block;
          color: #3A3A3A;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px;
          border: 2px solid #dee2e6;
          border-radius: 4px;
          font-size: 14px;
          color: #3A3A3A;
          font-family: inherit;
        }
        
        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #951414;
        }
        
        .form-textarea {
          resize: vertical;
        }
        
        .dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        
        .member-list {
          margin-top: 16px;
        }
        
        .member-item {
          background-color: #dee2e6;
          padding: 12px 16px;
          margin-bottom: 8px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .member-email {
          color: #3A3A3A;
          font-size: 14px;
        }
        
        .empty-state {
          color: #3A3A3A;
          opacity: 0.6;
          text-align: center;
          padding: 32px 0;
          font-size: 14px;
        }
        
        .section-title {
          color: #3A3A3A;
          font-size: 16px;
          margin: 0 0 16px 0;
        }
        
        .dialog-description {
          color: #3A3A3A;
          margin: 0 0 24px 0;
          font-size: 14px;
        }
        
        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          color: #3A3A3A;
        }
        
        .icon {
          width: 20px;
          height: 20px;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Group Management</h1>

        <div className="grid">
          {groups.map((group) => (
            <div key={group.id} className="card">
              <div className="card-header">
                <svg
                  className="icon-group"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="card-title">{group.name}</h3>
              </div>
              <p className="card-description">{group.description}</p>
              <div className="badge">
                <svg
                  className="badge-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {group.members.length} members
              </div>
              <div className="card-actions">
                <button
                  className="btn btn-text"
                  onClick={() => openDetails(group)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(group.id);
                  }}
                >
                  <svg
                    className="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="fab-container">
          <button
            className="fab"
            onClick={() => setAddUserDialogOpen(true)}
            title="Add User to Group"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </button>
          <button
            className="fab"
            onClick={() => setCreateDialogOpen(true)}
            title="Create New Group"
          >
            +
          </button>
        </div>

        {createDialogOpen && (
          <div className="overlay" onClick={() => setCreateDialogOpen(false)}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
              <h2 className="dialog-title">Create New Group</h2>
              <div className="form-group">
                <label className="form-label">Group Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  placeholder="Enter group name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, description: e.target.value })
                  }
                  placeholder="Enter group description"
                />
              </div>
              <div className="dialog-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateGroup}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {addUserDialogOpen && (
          <div className="overlay" onClick={() => setAddUserDialogOpen(false)}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
              <h2 className="dialog-title">Add User to Group</h2>
              <div className="form-group">
                <label className="form-label">Select Group</label>
                <select
                  className="form-select"
                  value={newUser.groupId}
                  onChange={(e) =>
                    setNewUser({ ...newUser, groupId: e.target.value })
                  }
                >
                  <option value="">Choose a group...</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">User Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="user@example.com"
                />
              </div>
              <div className="dialog-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setAddUserDialogOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddUser}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}

        {detailsDialogOpen && selectedGroup && (
          <div className="overlay" onClick={() => setDetailsDialogOpen(false)}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
              <div className="dialog-header">
                <div className="dialog-title">
                  <svg
                    className="icon-group"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {selectedGroup.name}
                </div>
                <button
                  className="close-btn"
                  onClick={() => setDetailsDialogOpen(false)}
                >
                  <svg
                    className="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="dialog-description">{selectedGroup.description}</p>
              <h3 className="section-title">
                Members ({selectedGroup.members.length})
              </h3>
              {selectedGroup.members.length === 0 ? (
                <p className="empty-state">No members yet</p>
              ) : (
                <div className="member-list">
                  {selectedGroup.members.map((member: any, index: any) => (
                    <div key={index} className="member-item">
                      <span className="member-email">{member}</span>
                      <button
                        className="btn btn-icon"
                        onClick={() =>
                          handleRemoveMember(selectedGroup.id, member)
                        }
                      >
                        <svg
                          className="icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupManagement;

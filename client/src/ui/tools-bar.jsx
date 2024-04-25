export const ToolsBar = () => {
  return (
    <div className="toolbars-background" onClick={(e) => e.stopPropagation()}>
      <div className="toolsbar-container">
        <div>
          <div className="avatar">
            <img src="/assets/img/avatar.png" width={100} height={100} />
          </div>
          <div className="toolsbar-user-data">
            <strong>Hi Jane Doe</strong>
            <span>
              Level 12 |<b> 430</b> 🪙
            </span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="button">
            <img src="/assets/img/bt1.png" />
          </div>
          <div className="button">
            <img src="/assets/img/bt2.png" />
          </div>
          <div className="button">
            <img src="/assets/img/bt3.png" />
          </div>
          <div className="button">
            <img src="/assets/img/bt4.png" />
          </div>
          <button className="button">
            <span>Fast Travel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

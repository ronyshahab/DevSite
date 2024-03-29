const MenuContainer = styled("div")`
  display: ${(p) => (p.show ? "flex" : "none")};
  min-width: 150px;
  position: absolute;
  z-index: 1000;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const Menu = ({ role }) => {
  const { show, onClose, props } = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });
  return (
    <MenuContainer {...props} role={role} show={show}>
      <button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        Item 1
      </button>
      <button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        Item 2
      </button>
    </MenuContainer>
  );
};

const Toggle = ({ id, children }) => {
  const [props, { show, toggle }] = useDropdownToggle();
  return (
    <button
      type="button"
      className="btn"
      id={id}
      {...props}
      onClick={toggle}
    >
      {children}
    </button>
  );
};

const DropdownButton = ({
  show,
  onToggle,
  drop,
  alignEnd,
  title,
  role,
}) => (
  <Dropdown
    show={show}
    onToggle={onToggle}
    drop={drop}
    alignEnd={alignEnd}
    itemSelector="button:not(:disabled)"
  >
    {({ props }) => (
      <div {...props} className="relative inline-block">
        <Toggle id="example-toggle">{title}</Toggle>
        <Menu role={role} />
      </div>
    )}
  </Dropdown>
);

const ButtonToolbar = styled("div")`
  & > * + * {
    margin-left: 12px;
  }
`;

const [show, setShow] = useState(false);

<ButtonToolbar className="dropdown-example">
  <DropdownButton
    show={show}
    onToggle={(nextShow) => setShow(nextShow)}
    title={`${show ? "Close" : "Open"} Dropdown`}
  />
  <DropdownButton alignEnd title="Align right" />

  <DropdownButton drop="up" title="Drop up" />
  <DropdownButton role="menu" title="Role 'menu'" />
</ButtonToolbar>;
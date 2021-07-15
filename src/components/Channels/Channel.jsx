import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import classnames from 'classnames';

import { modalKinds } from '../../constants';

const Channel = ({ channel, isCurrent, handleChangeChannel }) => {
  const { id, name, removable } = channel;
  const { t } = useTranslation();
  const btnTypeClass = isCurrent ? '' : 'btn-light';

  return (
    <NavItem as={ButtonGroup} className="d-flex justify-content-between mb-1 text-left">
      <NavLink eventKey={id} className={classnames(btnTypeClass, 'w-100 text-break rounded-0')}>
        <span>
          {'# '}
          {name}
        </span>
      </NavLink>
      {removable && (
        <Dropdown>
          <Dropdown.Toggle id={id} className={classnames(btnTypeClass, 'h-100 rounded-0')} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleChangeChannel(id, name, modalKinds.renameChannel)}>
              {t('channels.rename')}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleChangeChannel(id, name, modalKinds.removeChannel)}>
              {t('channels.remove')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </NavItem>
  );
};

export default Channel;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { Fragment } from 'react';
import { isEmpty, capitalize } from 'lodash';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { StatusIcon } from '../';

const wrapChild = ({ label, value, dataTestSubj }, index) => (
  <EuiFlexItem
    key={`summary-status-item-${index}`}
    grow={false}
    className="monitoring-summary-status__eui-content"
    data-test-subj={dataTestSubj}
  >
    {label}: <strong>{value}</strong>
  </EuiFlexItem>
);

const DefaultIconComponent = ({ status }) => (
  <Fragment>
    Status: {(
      <StatusIcon type={status.toUpperCase()} label={`Status: ${status}`} />
    )}
  </Fragment>
);

const StatusIndicator = ({ status, IconComponent }) => {
  if (isEmpty(status)) {
    return null;
  }

  return (
    <div className="monitoring-summary-status__status-indicator">
      <IconComponent status={status} />{' '}
      {capitalize(status)}
    </div>
  );
};

export function SummaryStatus({ children, status, IconComponent = DefaultIconComponent, ...props }) {
  return (
    <div className="monitoring-summary-status" role="status">
      <div className="monitoring-summary-status__content" {...props}>
        <EuiFlexGroup gutterSize="xs" alignItems="center">
          {children.map(wrapChild)}

          <EuiFlexItem
            grow={true}
            className="monitoring-summary-status__eui-content"
          >
            <StatusIndicator status={status} IconComponent={IconComponent} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </div>
  );
}

import { IconButton } from '@material-ui/core'
import { Bind } from 'lodash-decorators'
import { Settings as SettingsIcon } from 'mdi-material-ui'
import React, { Component, lazy, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import OnDemand from '../../OnDemand/OnDemand'
import WithToggle from '../../WithToggle/WithToggle'

// tslint:disable-next-line:typedef
const Dialog = lazy(() => import('./Dialog/Dialog'))

class Settings extends Component<WithNamespaces> {
  public render(): ReactNode {
    return <WithToggle initial={false}>{this._withToggle}</WithToggle>
  }

  @Bind()
  private _withToggle(open: boolean, toggle: () => void): ReactNode {
    return (
      <>
        <IconButton
          onClick={toggle}
          color="inherit"
          aria-label={this.props.t('settings')}
          aria-haspopup
        >
          <SettingsIcon />
        </IconButton>
        <OnDemand render={open}>
          <Dialog open={open} toggle={toggle} />
        </OnDemand>
      </>
    )
  }
}

export default withNamespaces('Settings')(Settings)

import * as React from 'react'

import { Button } from '../lib/button'
import { ButtonGroup } from '../lib/button-group'

import { DialogFooter, DialogContent, Dialog } from '../dialog'

interface IConfirmExitTutorialProps {
  readonly onDismissed: () => void
  readonly onContinue: () => void
}

export class ConfirmExitTutorial extends React.Component<
  IConfirmExitTutorialProps,
  {}
> {
  public render() {
    return (
      <Dialog
        title={'Exit Tutorial'}
        onDismissed={this.props.onDismissed}
        onSubmit={this.props.onContinue}
        type="normal"
      >
        <DialogContent>
          <p>
            Are you sure you want to leave the tutorial? This will bring you
            back to the home screen.
          </p>
        </DialogContent>
        <DialogFooter>
          <ButtonGroup>
            <Button type="submit">Exit tutorial</Button>
            <Button onClick={this.props.onDismissed}>Cancel</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}

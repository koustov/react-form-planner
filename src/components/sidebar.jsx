import * as React from 'react'

import {
  FPAccordion,
  FPAccordionDetails,
  FPAccordionSummary,
  FPBottomNavigation,
  FPSquareActionButton,
  FPDividerField,
  FPMediumHeader,
  FPPaperVerticalPadding,
  FPEModal,
  FPListIcon,
  FPListItem,
  FPListItemText,
  FPSideBarWrapper,
  FPModalLarge,
  FPPaper,
  FPPlanner,
  FPPlannerWrapper,
  FPSideBar,
  FVMenu,
  FVMenuItem
} from './styled'
import { Fragment, useEffect, useState } from 'react'
import {
  FaChevronDown,
  FaEdit,
  FaPlus,
  FaStickyNote
} from 'react-icons/fa'

import { Backdrop, Divider, Grid, List } from '@mui/material'
export const Sidebar = ({
  controls,
  onAdd,
  config,
  onPreviewClicked,
  onFormPropertiesClicked,
  small = false
}) => {
  const [expanded, setExpanded] = React.useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  // let open = Boolean(anchorEl)

  const handleExpansionChange = (index) => {
    if (expanded !== index) {
      setExpanded(index)
    }
  }
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const onMenuClicked = (con) => {
    handleClose()
    if (onAdd) {
      onAdd(con)
    }
  }

  const getFlatListMenu = () => {
    const res = []
    Object.keys(controls).forEach((k) => {
      res.push({
        display: k,
        isheader: true
      })
      controls[k].forEach((c) => {
        res.push(c)
      })
    })
    return res
  }
  return (
    <>
      {small ? (
        <FPListItem dense button onClick={(e) => handleClickListItem(e)}>
          <FPListIcon>
            <FaPlus/>
          </FPListIcon>
          <FPListItemText primary='Add Control' />
          <FVMenu
            id='lock-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              role: 'listbox'
            }}
          >
            {getFlatListMenu().map((c, ci) => {
              return (
                <FVMenuItem
                  elevation={1}
                  key={ci}
                  onClick={() => onMenuClicked(c)}
                  disabled={c.isheader}
                >
                  <FPListIcon>
                    {c.icon ? <c.icon/> : null}
                  </FPListIcon>
                  <FPListItemText primary={`${c.display}`} />
                </FVMenuItem>
                //   <>
                //   {controls[fc].map((con, conti) => {
                //     return (
                //       <FVMenuItem
                //         key={conti}
                //         onClick={() => onMenuClicked(con)}
                //       >
                //         <FPListIcon>
                //           <FontAwesomeIcon icon={con.icon} />
                //         </FPListIcon>
                //         <FPListItemText primary={`${con.display}`} />
                //       </FVMenuItem>
                //     )
                //   })}
                // </>
              )
            })}
          </FVMenu>
        </FPListItem>
      ) : (
        <FPSideBar elevation={1} className='flex-1'>
          <FPPaper className='fp-side-bar'>
            <FPPaper className='fp-side-bar-body'>
              <>
                {Object.keys(controls).length === 1 ? (
                  <>
                    {Object.keys(controls).map((fc, fci) => {
                      return (
                        <List
                          component='nav'
                          aria-label='toolbox-body'
                          style={{ width: '100%', overflow: 'auto' }}
                          key={fci}
                        >
                          {controls[fc].map((con, conti) => {
                            return (
                              <React.Fragment key={conti}>
                                <FPListItem
                                  dense
                                  button
                                  onClick={() => onAdd(con)}
                                >
                                  <FPListIcon>
                                    <con.icon/>
                                  </FPListIcon>
                                  <FPListItemText primary={`${con.display}`} />
                                </FPListItem>
                                <Divider />
                              </React.Fragment>
                            )
                          })}
                        </List>
                      )
                    })}
                  </>
                ) : (
                  <>
                    {Object.keys(controls).map((fc, fci) => {
                      return (
                        <FPAccordion
                          key={fci}
                          expanded={expanded === fci}
                          onChange={() => handleExpansionChange(fci)}
                        >
                          <FPAccordionSummary
                            expandIcon={
                              <FaChevronDown/>
                            }
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                          >
                            {fc}
                          </FPAccordionSummary>
                          <FPAccordionDetails>
                            <List
                              component='nav'
                              aria-label='toolbox-body'
                              style={{ width: '100%', overflow: 'auto' }}
                            >
                              {controls[fc].map((con, conti) => {
                                return (
                                  <React.Fragment key={conti}>
                                    <FPListItem
                                      dense
                                      button
                                      onClick={() => onAdd(con)}
                                    >
                                      <FPListIcon>
                                        <con.icon />
                                      </FPListIcon>
                                      <FPListItemText
                                        primary={`${con.display}`}
                                      />
                                    </FPListItem>
                                    <Divider />
                                  </React.Fragment>
                                )
                              })}
                            </List>
                          </FPAccordionDetails>
                        </FPAccordion>
                      )
                    })}
                  </>
                )}
              </>
            </FPPaper>
            <React.Fragment>
              {config.showPreview || config.showFormProperties ? (
                <div className='fp-side-bar-footer'>
                  {/* <FPDividerField /> */}
                  <FPBottomNavigation showLabels>
                    {config.showFormProperties ? (
                      <FPSquareActionButton
                        onClick={() => onFormPropertiesClicked()}
                      >
                        <div>
                          <FaEdit/>
                        </div>
                        <div>Properties</div>
                      </FPSquareActionButton>
                    ) : null}
                    {config.showPreview ? (
                      <FPSquareActionButton onClick={() => onPreviewClicked()}>
                        <div>
                          <FaStickyNote/>
                        </div>
                        <div>Preview</div>
                      </FPSquareActionButton>
                    ) : null}
                  </FPBottomNavigation>
                </div>
              ) : null}
            </React.Fragment>
          </FPPaper>
        </FPSideBar>
      )}
    </>
  )
}

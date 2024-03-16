import React, { PureComponent } from 'react'

export class Info extends PureComponent {
  render() {
    return (
        <div className="about__info grid">
            <div className="about__box">
            <i class='bx bx-award' ></i>
                <h3 className='about__title'>Experience</h3>
                <span className='about__subtitle'>1 Years Working</span>
            </div>
            <div className="about__box">
            <i class='bx bx-briefcase-alt' ></i>
                <h3 className='about__title'>Completed</h3>
                <span className='about__subtitle'>5 Projects</span>
            </div> 
        </div>
    )
  }
}

export default Info
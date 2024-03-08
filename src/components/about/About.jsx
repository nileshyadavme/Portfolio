import React, { PureComponent } from 'react'
import "./about.css";
export class About extends PureComponent {
  render() {
    return (
        <section className="about section" id="about">
        <h2 className="section__title">About me</h2>
        <spane className="section__subtitle">My Introduction</spane>
        <div className="about__container container grid">

        </div>
      </section>
    )
  }
}

export default About
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'

import {styles} from '../styles'
import {EarthCanvas} from './canvas'
import {SectionWrapper} from '../hoc'
import { slideIn } from "../utils/motion"

// l8rH_GlhLiYZRnKbi
//template_518pzvq
// service_za8lhnm


const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value } = e.target;

    setForm({...form, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_za8lhnm',
       'template_518pzvq',  
       {
        from_name: form.name,
        to_name: 'François Xavier',
        from_email: form.email,
        to_email: 'facenordgraphisme@gmail.com',
        message: form.message,
       },
       'l8rH_GlhLiYZRnKbi'
       
       )
       .then(() => {
        setLoading(false)
        alert('Merci, je reviens vers vous au plus vite.')

        setForm({
          name: '',
          email: '',
          message: '',
        })
       }, (error) => {
        setLoading(false)
        console.log(error);
        alert('Something went wrong')
       })
  }


  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
      variants={slideIn('left', 'tween', 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Discutons de votre projet</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Quel est votre Nom?</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Votre Nom" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />

          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Votre Adresse Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Quel est votre adresse mail?" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />

          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Votre Message</span>
            <textarea rows="7" name="message" value={form.message} onChange={handleChange} placeholder="Parlons de votre projet" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />

          </label>

          <button
          type="submit"
          className="bg-tertiary py-3 px-8 ouline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl">
            {loading ? 'Sending...' : 'Envoyer'}
          </button>

        </form>

      </motion.div>


      {/* //EARTH 3D */}

      <motion.div
      variants={slideIn('right', 'tween', 0.2, 1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

    </div>
  )
}

export default SectionWrapper(Contact,"contact")
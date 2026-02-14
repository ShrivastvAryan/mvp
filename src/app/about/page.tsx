import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-10 py-18">

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Content-1 */}
          <div className="pt-12 pl-10">
              <h1 className="text-3xl md:text-4xl font-semibold text-brand-secondary mt-2 uppercase italic inline-block border-b-2">
              About Us
            </h1>

          <h2 className="text-lg font-medium text-brand-secondary mt-4">
            "Crafted by Hands. Connected by Heart"
          </h2>

          <div className='space-y-3 text-sm md:text-base text-[#8B1E1E]'>
            <p>
              <span className='font-medium text-xl'>Art and craft</span> celebrate the beauty of creating by hand. Every piece reflects the 
              skill, patience, and creativity of artisans who transform natural materials into meaningful 
              objects. In a world of mass production, handmade art stands apart — carrying stories, traditions, and the unique touch of its maker.
            </p>

            <p>
              Art and craft are not just products, but living traditions passed down through 
              generations. From weaving and printing to carving and shaping, each craft involves 
              time-honoured techniques and thoughtful processes. The slight variations and imperfections 
              in handmade pieces are what make them truly special, reminding us that they are shaped by 
              human hands, not machines.
            </p>

            <p>
              Our collection brings together handcrafted art and craft created using sustainable 
              materials and traditional methods. Every product is carefully made by skilled artisans, 
              ensuring quality, authenticity, and individuality. When you choose handmade, you support 
              creativity, preserve cultural heritage, and invest in craftsmanship that values people over speed.
            </p>
          </div>
          
          {/* Values */}
          <div className='mt-7'>
            <h3 className='font-medium text-[#8B1E1E] mb-2 pl-2'>
              Our Craft Philosophy
            </h3>

            <ul className='list-disc pl-6 text-[#8B1E1E] text-base font-semibold space-y-1'>
                <li>Honouring traditional art & craft practices</li>
                <li>Celebrating handmade over mass-produced</li>
                <li>Working directly with artisan communities</li>
                <li>Using natural, sustainable materials</li>
                <li>Embracing imperfections as beauty</li>
            </ul>
          </div>
          </div>
        
        {/* Right side Image */}
        <div className='w-[480px] h-[520px] bg-gray-300 overflow-hidden mx-auto mt-25 rounded-3xl'>
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              Art & Craft Image
            </div>
        </div>
        
        </div>
      </div>
    </main>
  )
}

export default page
@include('partials.header')

@include('partials.public-navigation')

     
   	<!-- Header Section Start -->

    <header id="video-area" data-stellar-background-ratio="0.5">    
    	
	      <div id="block" data-vide-bg="video/video"></div>
	      <div class="fixed-top">
	          <div class="container">
	            <div class="logo-menu">
	              <a href="index.php" class="logo"><span class="lnr lnr-magic-wand"></span> NORAD</a>
	              <button class="menu-button" id="open-button"><i class="lnr lnr-menu"></i></button>    
	            </div>           
	          </div>
	      </div>
	      
	      
	      <div class="overlay overlay-2"></div>      
	      <div class="container">
	        <div class="row justify-content-md-center">
		          	<div class="col-md-10 wow" data-wow-delay="0.2s">
			          <ul class="cd-hero-slider">
				          <li class="selected pane">
				          	<div class="contents text-center">
				              <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Norad<br><h2 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Remote Functions for the Working Class</h2></h1>
				              <p class="lead  wow fadeIn" data-wow-duration="1000ms" data-wow-delay="400ms">Free High-quality REST driven API framework providing fast and reliable remote functions within seconds.</p>
				              <a href="#" id="sign-up-btn" class="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms"><i class="lnr lnr-chevron-right-circle"></i> Sign Up</a>
				              <p class="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">Already a member? <a href="#" class="sign-in-lnk" >SIGN IN</a></p>
					        </div>
				          </li>
				          <li class="pane">
				          	<!-- begin registration form -->
					        <div class="contents text-center">
				              <div class="login">
					              <form id="registerForm" class="text-center wow fadeInUp" data-wow-delay="0.3s">
									      <div class="login__form">
										        <div class="login__row">
											      <div class="form-group">
											          <input class="login__input email" name="email" type="email" data-error="Invalid email address" required placeholder="Email Address"/>
													  <div class="help-block with-errors"></div>
											      </div>
										        </div>
										        <div class="login__row">
											      <div class="form-group">
										          	<input id="regisration-pass" type="password" name="password" class="login__input pass" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,13}$" data-error="Must have 1 lower, 1 upper, 1 digit, and 6-13 characters" required placeholder="Password"/>
												  	<div class="help-block with-errors"></div>
											      </div>
										        </div>
										        <div class="login__row">
										          <div class="form-group">
										          	<input type="password" name="pass-confirm" class="login__input pass" data-match="#regisration-pass" data-error="Passwords do not match" required placeholder="Confirm Password"/>
												  	<div class="help-block with-errors"></div>
											      </div>
										        </div>
										        <div id="msgRegisterSubmit" class="h3 text-center hidden"></div> 
										        <button type="submit" class="btn btn-common sub_btn">Register</button>
										        <p class="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">Already a member? &nbsp;<a class="sign-in-lnk" href="#">SIGN IN</a></p>
									      </div>

					              </form>
							    </div>
					        </div>
				          </li>
				          <li class="pane">
				          	<!-- begin sign in form --> 
					        <div class="contents text-center">
				              <div class="login">
					             <form id="loginForm" class="text-center wow fadeInUp" data-wow-delay="0.3s">
								      <div class="login__form">
								        <div class="login__row">
									      <div class="form-group">
								          	<input type="email" name="email" class="login__input email" data-error="Invalid email address" required placeholder="Email Address"/>
										  	<div class="help-block with-errors"></div>
									      </div>
								        </div>
								        <div class="login__row">
									      <div class="form-group">
								          	<input type="password" name="password" class="login__input pass" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,13}$" data-error="Must have 1 lower, 1 upper, 1 digit, and 6-13 characters" required placeholder="Password"/>
										  	<div class="help-block with-errors"></div>
									      </div>
								        </div>
								        <div id="msgLoginSubmit" class="h3 text-center hidden"></div> 
								        <button type="submit" class="btn btn-common sub_btn">Sign in</button>
								        <p class="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms">Not a member yet? &nbsp;<a id="sign-up-back-2" href="#">SIGN UP</a></p>
								      </div>
					              </form>
							    </div>
					        </div>
				          </li>
			          </ul>
		          	</div>	        
	          </div>
	        </div> 
	      </div> 
	      
	    <!--  <div class="overlay overlay-2"></div>      
	      <div class="container">
	        <div class="row justify-content-md-center">
	          <div class="col-md-10 wow" data-wow-delay="0.2s">
		          	<div class="contents text-center">
		              <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Norad<br><h2 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Remote Functions for the Working Class</h2></h1>
		              <p class="lead  wow fadeIn" data-wow-duration="1000ms" data-wow-delay="400ms">Free High-quality REST driven API framework providing fast and reliable remote functions within seconds.</p>
		              <a href="#" class="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms"><i class="lnr lnr-chevron-right-circle"></i> Sign Up</a>
			        </div>
			        <div class="contents text-center">
		              <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Norad<br><h2 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">Remote Functions for the Working Class</h2></h1>
		              <p class="lead  wow fadeIn" data-wow-duration="1000ms" data-wow-delay="400ms">Free High-quality REST driven API framework providing fast and reliable remote functions within seconds.</p>
		              <a href="#" class="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms"><i class="lnr lnr-chevron-right-circle"></i> Sign Up</a>
			        </div>
		            		        
	          </div>
	        </div> 
	      </div>   -->   
    </header>
    <!-- Header Section End --> 


    <!-- Services Section Start -->
    <section id="services" class="section">
      <div class="container">
        <div class="section-header">          
          <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Our <span>Services</span></h2>
          <hr class="lines wow zoomIn" data-wow-delay="0.3s">
          <p class="section-subtitle wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Check out some of the services that makes Norad an amazing addition to your <br> daily work-life... simplifying much more than just code.</p>
        </div>																					  
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="0.2s">
              <div class="icon">
                <i class="lnr lnr-database"></i>
              </div>
              <h4>Database Optimization</h4>
              <p>With regular database optimization sweeps, we'll make sure the engine is always at peak physical performance.</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="0.4s">
              <div class="icon">
                <i class="lnr lnr-cog"></i>
              </div>
              <h4>Configurable UX</h4>
              <p>Provide configuration options for those pesky remote apps and Norad will customize content for your account.</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="0.6s">
              <div class="icon">
                <i class="lnr lnr-chart-bars"></i>
              </div>
              <h4>Aggressive Analytics</h4>
              <p>Keep track of your usage with built-in analytics and reporting, because guessing with your data is never fun.</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="0.8s">
              <div class="icon">
                <i class="lnr lnr-hand"></i>
              </div>
              <h4>Guided Hand-Holding</h4>
              <p>Extensive walkthroughs and tutorials to guide you through even the most complex implementations and usage.</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="1s">
              <div class="icon">
                <i class="lnr lnr-coffee-cup"></i>
              </div>
              <h4>Always-On</h4>
              <p>Our SLAs are pretty amazing, because they are based on top industry leading SLAs from Heroku and Amazon.</p>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="item-boxes wow fadeInDown" data-wow-delay="1.2s">
              <div class="icon">
                <i class="lnr lnr-briefcase"></i>
              </div>
              <h4>Lawering & Legal</h4>
              <p>Don't look in the briefcase, nothing out of the ordinary here.  Mind your own business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Services Section End -->

	<!-- Counter Section Start -->
    <div class="counters section" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row"> 
          <div class="col-sm-6 col-md-3 col-lg-3">
            <div class="wow fadeInUp" data-wow-delay=".2s">
              <div class="facts-item"> 
                <div class="icon">
                  <i class="lnr lnr-magic-wand"></i>
                </div>                
                <div class="fact-count">
                  <h3><span class="counter">100</span>%</h3>
                  <h4>Faster</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3">
            <div class="wow fadeInUp" data-wow-delay=".4s">
              <div class="facts-item">
                <div class="icon">
                  <i class="lnr lnr-coffee-cup"></i>
                </div>                
                <div class="fact-count">
                  <h3><span class="counter">700</span></h3>
                  <h4>Cup of Coffee</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3">
            <div class="wow fadeInUp" data-wow-delay=".6s">
              <div class="facts-item">
                <div class="icon">
                  <i class="lnr lnr-user"></i>
                </div>                
                <div class="fact-count">
                  <h3><span class="counter">10000</span>+</h3>
                  <h4>Active Clients</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3">
            <div class="wow fadeInUp" data-wow-delay=".8s">
              <div class="facts-item">
                <div class="icon">
                  <i class="lnr lnr-heart"></i>
                </div>                
                <div class="fact-count">
                  <h3><span class="counter">1689</span></h3>
                  <h4>Peoples Love</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Counter Section End -->
	
    <!-- Features Section Start -->
    <section id="features" class="section" data-stellar-background-ratio="0.2">
      <div class="container">
        <div class="section-header">          
          <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Amazing <span>Features</span></h2>
          <hr class="lines wow zoomIn" data-wow-delay="0.3s">
          <p class="section-subtitle wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Norad is chalk-full of awesome features that makes the user-experience above <br> all others.  Check out what we're doing for you.</p>
        </div>																					  
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div class="content-left text-right wow fadeInLeft animated" data-wow-offset="10">
              <div class="box-item left">
                <span class="icon">
                  <i class="lnr lnr-graduation-hat"></i>
                </span>
                <div class="text">
                  <h4>Content Learning</h4>
                  <p>API functions that learn through popular use.  The more calls, the smarter they become.</p>
                </div>
              </div>
              <div class="box-item left">
                <span class="icon">
                  <i class="lnr lnr-laptop-phone"></i>
                </span>
                <div class="text">
                  <h4>Fully Responsive</h4>
                  <p>Access your account on the go, and make important updates with ease.</p>
                </div>
              </div>
              <div class="box-item left">
                <span class="icon">
                  <i class="lnr lnr-lock"></i>
                </span>
                <div class="text">
                  <h4>Secure & Secure</h4>
                  <p>Such secure protocols and policies we have to say it twice.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div class="show-box wow fadeInDown animated" data-wow-offset="10">
              <img src="{{ asset('img/features/feature.jpg') }}" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div class="content-right text-left wow fadeInRight animated" data-wow-offset="10">
              <div class="box-item right">
                <span class="icon">
                  <i class="lnr lnr-leaf"></i>
                </span>
                <div class="text">
                  <h4>Totally Green</h4>
                  <p>Minimalistic and fully cloud-hosted, it's like we're hardly even here.</p>
                </div>
              </div>
              <div class="box-item right">
                <span class="icon">
                  <i class="lnr lnr-bus"></i>
                </span>
                <div class="text">
                  <h4>Secure Transportation</h4>
                  <p>Your data is secured during transit with SSL, and additional private encryption.</p>
                </div>
              </div>
              <div class="box-item right">
                <span class="icon">
                  <i class="lnr lnr-heart"></i>
                </span>
                <div class="text">
                  <h4>Just Lovely</h4>
                  <p>A simply lovely UI/UX that will make you keep coming back for more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Features Section End -->    

    <!-- Contact Section Start -->
    <section id="contact" class="section">
      <div class="container">
        <div class="row justify-content-md-center">          
          <div class="col-md-9 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">            
            <div class="contact-block">
              <div class="section-header">          
                <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Contact <span>Us</span></h2>
                <hr class="lines wow zoomIn" data-wow-delay="0.3s">
              </div>
              <form id="contactForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required data-error="Please enter your name">
                      <div class="help-block with-errors"></div>
                    </div>                                 
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input placeholder="Your Email" type="email" id="email" class="form-control" name="email" required data-error="Bruh, that email address is invalid">
                      <div class="help-block with-errors"></div>
                    </div> 
                  </div>
                  <div class="col-md-12">
                    <div class="form-group"> 
                      <textarea class="form-control" name="message" placeholder="Your Message" rows="11" data-error="Write your message" required></textarea>
                      <div class="help-block with-errors"></div>
                    </div>
                    <div class="submit-button text-center">
                      <button class="btn btn-common" id="submit" type="submit">Send Message</button>
                      <div id="msgSubmit" class="h3 text-center hidden"></div> 
                      <div class="clearfix"></div> 
                    </div>
                  </div>
                </div>            
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Contact Section End -->

    <!-- Subcribe Section Start -->
    <div id="subscribe" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Subscribe <span>Newsletter</span></h2>
          <hr class="lines wow zoomIn" data-wow-delay="0.3s">
          <p class="section-subtitle wow fadeIn" data-wow-duration="1000ms" data-wow-delay="0.3s">Subscribe to get all latest news from us.</p>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-md-8">
              <form id="subscribeForm" class="text-center form-inline wow fadeInUp" data-wow-delay="0.3s">
	              <div class="form-group" style="width:100%;">
	                <input id="subscribe-email-input" type="email" class="mb-20 form-control" name="email" data-error="Bruh, that email address is invalid" required placeholder="Email Address">
	                <button id="subscribe-email-btn" class="sub_btn">subscribe</button>
	                <div class="help-block with-errors"></div>
	              </div>
				<div id="msgSubscribeSubmit" class="h3 text-center hidden"></div> 
              </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Subcribe Section End -->

@include('partials.footer')
 
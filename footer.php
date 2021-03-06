<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
				<div class="site-info">
					<div id="site-navigation" class="main-navigation" role="navigation">
					<!-- <div class=testing> -->
						<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
						
					</div>

					<p class="footer-note-wrapper"><span class="footer-note">Brought to you by</span><a href="https://github.com/btrischuk">Breckon Trischuk</a></p>
			<!-- </div> -->
				</div><!-- .site-info -->
			</footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>

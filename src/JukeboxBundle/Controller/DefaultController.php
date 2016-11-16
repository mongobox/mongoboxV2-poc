<?php

namespace JukeboxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/live")
     */
    public function indexAction()
    {
        return $this->render('JukeboxBundle:Default:index.html.twig');
    }
}

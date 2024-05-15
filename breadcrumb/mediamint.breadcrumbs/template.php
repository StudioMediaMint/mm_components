<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

/**
 * @global CMain $APPLICATION
 */

global $APPLICATION;

//delayed function must return a string
if(empty($arResult))
	return "";

$strReturn = '';

$strReturn .= '<div class="bx-breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
<p>';

$itemSize = count($arResult);
for($index = 0; $index < $itemSize; $index++)
{
	$title = htmlspecialcharsex($arResult[$index]["TITLE"]);
	$arrow = '<span class="bx-breadcrumb__arrow"> &nbsp;> </span>';
	
	if($arResult[$index]["LINK"] <> "" && $index != $itemSize-1)
	{
		$strReturn .= '
			<a href="'.$arResult[$index]["LINK"].'" title="'.$title.'" itemprop="item" class="bx-breadcrumb-item text-16">
				<span class="bx-breadcrumb__title" itemprop="name">'.$title.'</span>
				'.$arrow.'
			</a>
			<meta itemprop="position" content="'.($index + 1).'" />';
	}
	else
	{
		$strReturn .= '<span class="bx-breadcrumb-item current text-16 bx-breadcrumb__title">'.$title.'</span>';
	}
}

$strReturn .= '</p></div>';

return $strReturn;

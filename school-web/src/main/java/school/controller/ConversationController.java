package school.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.support.RequestContextUtils;

import school.dto.ConversationDto;
import school.model.Conversation;
import school.service.ConversationService;
import school.service.MessagesService;

@Controller
public class ConversationController {

	@Autowired
	public ConversationService conversationService;

	@Autowired
	public MessagesService messagesService;

	@RequestMapping("inbox")
	public String inbox(Model model, Principal principal,
			HttpServletRequest request) {
		long id = Long.valueOf(principal.getName());
		List<Conversation> conversationsS = conversationService.findSent(id);
		List<Conversation> conversationsI = conversationService.findInbox(id);
		int sentSize = conversationsS.size();
		List<ConversationDto> conversationsDto = new ArrayList<ConversationDto>();
		if (conversationsI.size() > 0) {
			Locale loc = RequestContextUtils.getLocale(request);
			conversationsDto = conversationService
					.constructInboxConversationsDto(conversationsI, id, loc);
		}
		model.addAttribute("conversationsDto", conversationsDto);
		model.addAttribute("sentSize", sentSize);
		request.getSession().setAttribute("currentPage", "inbox");
		return "inbox";
	}

	@RequestMapping("sent")
	public String sent(Model model, Principal principal,
			HttpServletRequest request) {
		Long id = Long.valueOf(principal.getName());
		List<Conversation> conversationsI = conversationService.findInbox(id);
		List<Conversation> conversationsS = conversationService.findSent(id);
		int inboxSize = conversationsI.size();
		List<ConversationDto> conversationsDto = new ArrayList<ConversationDto>();
		if (conversationsS.size() > 0) {
			Locale loc = RequestContextUtils.getLocale(request);
			conversationsDto = conversationService
					.constructSentConversationsDto(conversationsS, id, loc);
		}
		model.addAttribute("conversationsDto", conversationsDto);
		model.addAttribute("inboxSize", inboxSize);
		request.getSession().setAttribute("currentPage", "sent");
		return "sent";
	}

	@RequestMapping(value = "delete-conversations", method = RequestMethod.POST)
	public String deleteSentConversations(
			@RequestParam(value = "selected", required = false) String[] ids,
			Principal principal, HttpServletRequest request) {

		long id = Long.valueOf(principal.getName());
		if (ids != null) {
			conversationService.deleteConversations(ids, id);
		}
		String currentPage = (String) request.getSession().getAttribute(
				"currentPage");
		return "redirect:/" + currentPage;
	}

	@RequestMapping(value = "compose", method = RequestMethod.POST)
	public String compose(
			@RequestParam(value = "to", required = false) String name,
			@RequestParam(value = "subject", required = false) String subject,
			@RequestParam(value = "text", required = false) String text,
			HttpServletRequest request, Principal principal) {
		Long principalId = Long.valueOf(principal.getName());
		Long receiverId = Long.valueOf(name);
		conversationService.createConversation(subject, principalId,
				receiverId, text);
		String currectPage = (String) request.getSession().getAttribute(
				"currentPage");
		return "redirect:/" + currectPage;
	}
}

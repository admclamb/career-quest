package com.careerquest.backend.board;

import org.springframework.web.bind.annotation.RestController;

import com.careerquest.backend.board.dto.request.CreateBoardDto;
import com.careerquest.backend.board.entities.Board;
import com.careerquest.backend.board.factories.BoardFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/v1/board")
public class BoardController {
    @Autowired
    BoardService boardService;

    @Autowired
    BoardFactory boardFactory;

    @PostMapping
    public String postMethodName(@RequestBody CreateBoardDto createBoardDto) {
        Board board = boardService.create(createBoardDto);

        return boardFactory.createBoardDtoFromBoard(board).getId();
    }

}
